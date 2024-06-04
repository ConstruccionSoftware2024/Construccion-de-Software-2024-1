/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      navbar: '#987394',
      header: '#987394',
      textoDM: '#F4F0F3',
      cardDM: '#52463D',
      online: '#e0cbeb',
      shadowbg: '#D6D5D4',
      circle: '#4ade80',
      seguro: '#059669',
      peligro: '#facc15',
      baned: '#ef4444'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
