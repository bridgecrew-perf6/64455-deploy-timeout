module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@atelierfabien/mono-next/**/*.{js,jsx,ts,tsx}',
    '../../../node_modules/@atelierfabien/mono-next/**/*.{js,jsx,ts,tsx}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
