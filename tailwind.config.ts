import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      fontSize: {
        xs: ['12px', { lineHeight: '1.618' }],
        sm: ['14px', { lineHeight: '1.618' }],
        base: ['16px', { lineHeight: '1.618' }],
        lg: ['20px', { lineHeight: '1.5' }],
        xl: ['26px', { lineHeight: '1.4' }],
        '2xl': ['34px', { lineHeight: '1.3' }],
        '3xl': ['44px', { lineHeight: '1.2' }],
        '4xl': ['56px', { lineHeight: '1.15' }],
        '5xl': ['72px', { lineHeight: '1.1' }],
      },
      colors: {
        // We expose design system colors mapped to custom variables
        background: 'var(--bg)',
        cardBg: 'var(--bg-card)',
        sectionAlt: 'var(--bg-section-alt)',
        textMain: 'var(--text)',
        textMuted: 'var(--text-muted)',
        sanskrit: 'var(--sanskrit)',
        saffron: 'var(--saffron)',
        gold: 'var(--gold)',
        goldLight: 'var(--gold-light)',
        maroon: 'var(--maroon)',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'Inter', 'sans-serif'],
        serif: ['var(--font-heading)', 'Playfair Display', 'Georgia', 'serif'],
        sanskrit: ['var(--font-sanskrit)', 'Tiro Devanagari Hindi', 'serif'],
      },
      animation: {
        'idle-float': 'floatIdle 6s ease-in-out infinite',
        'spin-slow': 'spinSlow 30s linear infinite',
      },
      keyframes: {
        floatIdle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      boxShadow: {
        'antigravity': '0 12px 40px rgba(184, 134, 11, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
