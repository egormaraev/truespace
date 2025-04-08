import type { Config } from 'tailwindcss';
// @ts-ignore - Игнорируем проблему типизации для JS-плагина
const { backdropBlurPlugin } = require('./src/utils/tailwind-plugins');

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0ff',
          100: '#b3d1ff',
          200: '#80b3ff',
          300: '#4d94ff',
          400: '#1a75ff',
          500: '#0066ff',
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
        dark: {
          100: '#3c3c42',
          200: '#2d2d33',
          300: '#1e1e24',
          400: '#0f0f15',
          500: '#0a0a0d',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'slide-down': 'slideDown 0.5s ease-in-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 15px rgba(96, 165, 250, 0.5)',
        'glow-white': '0 0 15px rgba(255, 255, 255, 0.3)',
      },
    },
  },
  plugins: [
    backdropBlurPlugin,
  ],
};

export default config; 