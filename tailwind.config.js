/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brandPink: '#ff3f6c',
        brandPinkHover: '#e6355d',
        brandGold: '#d4af37',
        darkBg: '#121212',
        darkCard: '#1e1e1e',
        darkBorder: '#2e2e2e'
      },
      fontFamily: {
        sans: ['Assistant', 'sans-serif'],
        serif: ['Playfair Display', 'serif']
      }
    },
  },
  plugins: [],
}
