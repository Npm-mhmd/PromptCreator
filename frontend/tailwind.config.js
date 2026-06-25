/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sketch: ['Caveat', 'cursive'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        paper: {
          50: '#faf7f0',
          100: '#f5f0e4',
          200: '#ede3cc',
          300: '#e0d0a8',
          400: '#d4bd84',
          500: '#c8a95f',
          600: '#b8923e',
          700: '#9a7832',
          800: '#7f642c',
          900: '#6a5328',
          950: '#3a2d17',
        },
        ink: {
          50: '#f7f6f5',
          100: '#e7e5e2',
          200: '#d1cdc6',
          300: '#b5aea3',
          400: '#9e9587',
          500: '#8a7f6f',
          600: '#7c7263',
          700: '#655d51',
          800: '#4a443b',
          900: '#3c3730',
          950: '#2c2823',
        },
        sketch: {
          coral: '#e8635a',
          sky: '#5a9fd4',
          sage: '#7cb87e',
          gold: '#e8b84a',
          lavender: '#b08fc7',
          peach: '#f0a88c',
          mint: '#6bc4a8',
          rose: '#d4657a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'sketch-in': 'sketchIn 0.4s ease-out',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'draw-line': 'drawLine 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        sketchIn: {
          '0%': { transform: 'scale(0.95) rotate(-0.5deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-1deg)' },
          '75%': { transform: 'rotate(1deg)' },
        },
        drawLine: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
};
