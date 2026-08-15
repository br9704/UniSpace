function greeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'good morning'
  if (hour < 17) return 'good afternoon'
  return 'good evening'
}

/**
 * The page's masthead.
 *
 * Four lines on a real hierarchy — 15 / 36 / 14 / 11 — where SIGNAL set all
 * four at 11px and let the wordmark reach 28. The 36px extrabold line is the
 * largest type in the app and the only thing on this screen that outweighs a
 * tile's percentage.
 *
 * Extracted from HomePage purely for CLAUDE.md § 3's 150-line cap; the page
 * gained a MotionConfig wrapper, a cross-fade stack and five reveal wrappers,
 * and this was the cleanest block to lift.
 */
export default function HomeHeader() {
  return (
    // 24px sides set the page gutter every section below inherits. 56px of top
    // opens the page; the bottom is 32 rather than the pre-SIGNAL 40 because
    // that 40 sat under a filled navy band with its own edge, and on this flat
    // ground the same gap reads as a hole.
    <header className="px-6 pt-14 pb-8">
      <p className="mono text-[15px]" style={{ color: 'var(--color-text-muted)' }}>
        &gt; {greeting()}
      </p>
      <h1
        className="mono text-[36px] font-extrabold mt-0.5 tracking-[-1px] leading-[1.1]"
        style={{ color: 'var(--color-text-primary)' }}
      >
        UNISPACE
      </h1>
      <p className="mono text-[14px] mt-2" style={{ color: 'var(--color-text-secondary)' }}>
        University of Melbourne · Parkville
      </p>
      {/* Stated plainly and kept visible — the UoM name appears throughout, and
          a reader should never have to wonder whether this is official. */}
      <p className="mono text-xs mt-1.5" style={{ color: 'var(--color-text-muted)' }}>
        Not affiliated with the University of Melbourne
      </p>
    </header>
  )
}
