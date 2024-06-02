/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      navbar: '#987394',
      header: '#987394',
      cards: '#C2B6AD'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
