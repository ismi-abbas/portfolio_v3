/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'surface-2': 'var(--color-surface-2)',
        line: 'var(--color-line)',
        ink: 'var(--color-ink)',
        'ink-muted': 'var(--color-ink-muted)',
        'ink-faint': 'var(--color-ink-faint)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          strong: 'var(--color-accent-strong)',
          soft: 'var(--color-accent-soft)',
          inverse: 'var(--color-accent-inverse)',
        },
        // Legacy tokens kept for pages not yet redesigned
        primary: '#872341',
        secondary: '#BE3144',
        tertiary: '#F05941',
      },
      fontFamily: {
        display: ['Schibsted Grotesk Variable', 'sans-serif'],
        sans: ['Schibsted Grotesk Variable', 'sans-serif'],
        mono: ['Google Sans Code Variable', 'monospace'],
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        reveal: 'reveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
};
