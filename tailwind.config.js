/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0efff',
          200: '#b9dfff',
          300: '#7cc4ff',
          400: '#36a5ff',
          500: '#0c87f0',
          600: '#006bcd',
          700: '#0055a6',
          800: '#004989',
          900: '#003d71',
        },
        dark: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#1a1a1a',
        }
      },
      fontFamily: {
        sans: ['"Noto Sans Khmer"', '"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Noto Sans Khmer"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
