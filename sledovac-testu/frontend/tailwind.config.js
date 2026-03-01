/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
      backgroundImage: {
        'red-gradient': 'linear-gradient(90deg, #b01a1a 0%, #e62020 100%)',
        'sidebar-gradient': 'linear-gradient(180deg, #100f14 0%, #1a0808 100%)',
      }
    },
  },
  plugins: [],
}