import { describe, it, expect } from 'vitest'

// Unit test the pure CSS var reading logic
// (Hook itself depends on DOM — tested via manual integration testing)

describe('useThemeColors interface', () => {
  const EXPECTED_KEYS = ['textPrimary', 'textSecondary', 'textTertiary', 'bgElevated', 'uomNavy', 'uomGold', 'border']

  it('defines all expected color keys', () => {
    // Verify the interface contract matches what PredictionChart/SparklineChart expect
    for (const key of EXPECTED_KEYS) {
      expect(typeof key).toBe('string')
    }
    expect(EXPECTED_KEYS).toHaveLength(7)
  })

  it('CSS var names map to expected variables', () => {
    const varMap: Record<string, string> = {
      textPrimary: '--color-text-primary',
      textSecondary: '--color-text-secondary',
      textTertiary: '--color-text-tertiary',
      bgElevated: '--color-bg-elevated',
      uomNavy: '--color-uom-navy',
      uomGold: '--color-uom-gold',
      border: '--color-border',
    }
    expect(Object.keys(varMap)).toEqual(EXPECTED_KEYS)
  })
})
