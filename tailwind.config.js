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
        // above so the admin dashboard's look is untouched). Each color
        // reads from a CSS variable (defined in index.css) so the admin
        // panel can swap the whole site's theme at runtime — the
        // "rgb(var(...) / <alpha-value>)" form is what lets Tailwind's
        // opacity modifiers (e.g. bg-rkGold/40) keep working with that.
        rkCream: 'rgb(var(--rk-cream) / <alpha-value>)',
        rkCreamSoft: 'rgb(var(--rk-cream-soft) / <alpha-value>)',
        rkCreamDeep: 'rgb(var(--rk-cream-deep) / <alpha-value>)',
        rkInk: 'rgb(var(--rk-ink) / <alpha-value>)',
        rkInkSoft: 'rgb(var(--rk-ink-soft) / <alpha-value>)',
        rkLine: 'rgb(var(--rk-line) / <alpha-value>)',
        rkGold: 'rgb(var(--rk-gold) / <alpha-value>)',
        rkNight: 'rgb(var(--rk-night) / <alpha-value>)',
        rkNightSoft: 'rgb(var(--rk-night-soft) / <alpha-value>)',
        rkTan: 'rgb(var(--rk-tan) / <alpha-value>)',
        rkTanHover: 'rgb(var(--rk-tan-hover) / <alpha-value>)',
        rkMaroon: 'rgb(var(--rk-maroon) / <alpha-value>)',
        rkMaroonSoft: 'rgb(var(--rk-maroon-soft) / <alpha-value>)'
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
