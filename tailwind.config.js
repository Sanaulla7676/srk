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
        darkBorder: '#2e2e2e',
        // RK storefront redesign palette (kept separate from the tokens
        // above so the admin dashboard's look is untouched)
        rkCream: '#F3EBDE',
        rkCreamSoft: '#F8F2E8',
        rkCreamDeep: '#EADFCC',
        rkInk: '#221D18',
        rkInkSoft: '#4A433C',
        rkLine: '#DBCEB8',
        rkGold: '#B8935F',
        rkNight: '#161210',
        rkNightSoft: '#221C18',
        rkTan: '#D8AF92',
        rkTanHover: '#C99C7D',
        rkMaroon: '#3D1420',
        rkMaroonSoft: '#5A1D2E'
      },
      fontFamily: {
        sans: ['Assistant', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        // RK storefront redesign fonts
        rkSans: ['Jost', 'sans-serif'],
        rkScript: ['Allura', 'cursive']
      }
    },
  },
  plugins: [],
}
