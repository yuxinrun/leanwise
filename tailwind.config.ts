import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,md,mdx}', './mdx-components.tsx'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        forest: { DEFAULT: '#245B45', 50: '#F2F7F3', 100: '#E5EFE6', 200: '#C8DEC9', 300: '#9FC4A7', 600: '#1E4E3B', 700: '#173C30', 900: '#102A21' },
        ink: '#173C30',
        cream: '#F7F6EF',
        mint: '#E5EFE6',
        orange: { DEFAULT: '#E89A51', soft: '#F7E3CF' },
        sun: '#F2C879',
        charcoal: '#292D2A',
        mist: '#858B84',
        line: '#DDDCD1',
      },
      fontFamily: {
        sans: ['"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
        display: ['"Songti SC"', '"Noto Serif SC"', '"Source Han Serif SC"', 'Georgia', 'serif'],
        mono: ['"SFMono-Regular"', 'Consolas', '"Liberation Mono"', 'monospace'],
      },
      fontSize: {
        'hero': ['clamp(2.4rem, 6.2vw, 5rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'display': ['clamp(1.9rem, 4vw, 3.25rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
      },
      boxShadow: {
        soft: '0 12px 40px -24px rgba(23, 60, 48, 0.35)',
        card: '0 2px 18px -10px rgba(23, 60, 48, 0.22)',
      },
      keyframes: {
        'fade-up': { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: { 'fade-up': 'fade-up 0.6s ease-out both' },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
