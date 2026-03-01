/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Archivo', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#0A0A10',
          sidebar: '#0D0D14',
          card: '#1C1C24',
          red: '#E53935',
          redHover: '#F44336',
          text: '#FFFFFF',
          textMuted: '#8F8F9A',
        }
      },
    },
  },
  plugins: [],
}