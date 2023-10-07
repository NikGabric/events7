/** @type {import('tailwindcss').Config} */
/*eslint-env node*/
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['halloween']
  }
};
