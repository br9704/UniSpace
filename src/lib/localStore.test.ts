import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  canReportAgain,
  markReported,
  readFavourites,
  toggleFavourite,
  writeFavourites,
} from './localStore'

/** Minimal in-memory localStorage — the test environment is node, not jsdom. */
function installStorage(initial: Record<string, string> = {}) {
  const store = new Map(Object.entries(initial))
  vi.stubGlobal('localStorage', {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => { store.set(k, v) },
    removeItem: (k: string) => { store.delete(k) },
    clear: () => store.clear(),
  })
  return store
}

describe('toggleFavourite', () => {
  it('adds a building that is not yet favourited', () => {
    expect(toggleFavourite([], 'a')).toEqual(['a'])
  })

  it('removes one that already is', () => {
    expect(toggleFavourite(['a', 'b'], 'a')).toEqual(['b'])
  })

  it('does not mutate the list it was given', () => {
    const original = ['a']
    toggleFavourite(original, 'b')
    expect(original).toEqual(['a'])
  })
})

describe('favourites persistence', () => {
  beforeEach(() => installStorage())

  it('survives a reload', () => {
    // S14's stated criterion: "Favourites persist across page reloads".
    writeFavourites(['baillieu', 'erc'])
    expect(readFavourites()).toEqual(['baillieu', 'erc'])
  })

  it('starts empty when nothing is stored', () => {
    expect(readFavourites()).toEqual([])
  })

  it('migrates favourites saved under the old `pulse_` key', () => {
    // The project was renamed from Pulse to UniSpace. Anyone with existing
    // favourites should not silently lose them to that.
    const store = installStorage({ pulse_favourites: JSON.stringify(['old-fave']) })
    expect(readFavourites()).toEqual(['old-fave'])
    expect(store.get('unispace:favourites')).toBe(JSON.stringify(['old-fave']))
    expect(store.has('pulse_favourites')).toBe(false)
  })

  it('ignores corrupted storage rather than crashing', () => {
    // This is user-editable storage; a malformed value must not be able to
    // take down the home screen.
    installStorage({ 'unispace:favourites': '{not json' })
    expect(readFavourites()).toEqual([])
  })

  it('discards non-string entries', () => {
    installStorage({ 'unispace:favourites': JSON.stringify(['ok', 42, null]) })
    expect(readFavourites()).toEqual(['ok'])
  })

  it('survives storage being unavailable', () => {
    // Safari private mode throws on setItem.
    vi.stubGlobal('localStorage', {
      getItem: () => { throw new Error('denied') },
      setItem: () => { throw new Error('denied') },
      removeItem: () => { throw new Error('denied') },
    })
    expect(() => writeFavourites(['a'])).not.toThrow()
    expect(readFavourites()).toEqual([])
  })
})

describe('report throttle', () => {
  const WINDOW = 5 * 60 * 1000
  const T0 = 1_700_000_000_000

  beforeEach(() => installStorage())

  it('allows a first report', () => {
    expect(canReportAgain('b1', WINDOW, T0)).toBe(true)
  })

  it('blocks a second report inside the window', () => {
    markReported('b1', T0)
    expect(canReportAgain('b1', WINDOW, T0 + WINDOW - 1)).toBe(false)
  })

  it('allows again once the window has passed', () => {
    markReported('b1', T0)
    expect(canReportAgain('b1', WINDOW, T0 + WINDOW)).toBe(true)
  })

  it('throttles each building independently', () => {
    // Reporting on the library should not stop you reporting on the ERC.
    markReported('b1', T0)
    expect(canReportAgain('b2', WINDOW, T0)).toBe(true)
  })
})
