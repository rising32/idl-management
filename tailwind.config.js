module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: '#000000',
      background: '#14477E',
      chrono: '#03E20C',
      'light-gray': '#F2F2F2',
      'black-icon': '#111111',
      'blue-link': '#A2D8FF',
      rouge: '#EC1C24',
      rouge1: '#FF0000',
      button: '#365B9D',
      gray: '#6A798D',
      gray1: '#C4C4C4',
    },
  },
  plugins: [require('tailwindcss'), require('autoprefixer')],
};
