// Theme hook — dark mode removed, light mode only
// Kept as a stub so imports don't break

export function useTheme() {
  return { theme: 'light' as const, preference: 'light' as const, setPreference: () => {} }
}

// Clean up any stale data-theme attribute from previous dark mode usage
if (typeof window !== 'undefined') {
  delete document.documentElement.dataset.theme
  localStorage.removeItem('unispace-theme')
}
