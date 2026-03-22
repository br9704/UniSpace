import { useEffect, useState } from 'react'

interface ThemeColors {
  textPrimary: string
  textSecondary: string
  textTertiary: string
  bgElevated: string
  uomNavy: string
  uomGold: string
  border: string
}

function readCssVar(name: string): string {
  if (typeof window === 'undefined') return '#000000'
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || '#000000'
}

function readAll(): ThemeColors {
  return {
    textPrimary: readCssVar('--color-text-primary'),
    textSecondary: readCssVar('--color-text-secondary'),
    textTertiary: readCssVar('--color-text-tertiary'),
    bgElevated: readCssVar('--color-bg-elevated'),
    uomNavy: readCssVar('--color-uom-navy'),
    uomGold: readCssVar('--color-uom-gold'),
    border: readCssVar('--color-border'),
  }
}

export function useThemeColors(): ThemeColors {
  const [colors, setColors] = useState<ThemeColors>(readAll)

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setColors(readAll())
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  return colors
}
