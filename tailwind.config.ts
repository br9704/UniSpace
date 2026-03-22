import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
      },
      colors: {
        uom: {
          navy: '#003865',
          blue: '#0080A4',
          gold: '#C8A951',
          'gold-light': '#E8C97A',
        },
        bg: {
          primary: '#FFFFFF',
          secondary: '#F5F7FA',
          elevated: '#FFFFFF',
          card: '#FAFBFD',
          chip: '#F0F2F5',
          input: '#FAFBFD',
          page: '#F0F2F5',
        },
        border: {
          DEFAULT: '#E2E8F0',
          bright: '#CBD5E1',
        },
        text: {
          primary: '#1E293B',
          secondary: '#64748B',
          tertiary: '#94A3B8',
          accent: '#003865',
        },
        occupancy: {
          empty: '#4CAF7D',
          quiet: '#A8C44E',
          moderate: '#F5A623',
          busy: '#E87040',
          packed: '#E05252',
        }
      },
      fontFamily: {
        display: ['"Neue Haas Grotesk Display"', '"Helvetica Neue"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '20px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,56,101,0.06)',
        elevated: '0 8px 30px rgba(0,56,101,0.12), 0 2px 8px rgba(0,0,0,0.06)',
      }
    }
  },
  plugins: []
} satisfies Config
