/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      navbar: '#E5D9CC',
      header: '#987394',
      textoDM: '#F4F0F3',
      cardDM: '#52463D',
      online: '#e0cbeb'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
