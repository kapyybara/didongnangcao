/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        landing:
          'linear-gradient(rgba(35, 25, 23, .48), rgba(35, 25, 23, .48)), url(/src/assets/landing.jpg)',
        interior:
          'linear-gradient(rgba(35, 25, 23, .48), rgba(35, 25, 23, .48)), url(/src/assets/interior.jpg)',
        church:
          'linear-gradient(rgba(35, 25, 23, .48), rgba(35, 25, 23, .48)), url(/src/assets/church.jpg)',
      },
    },
  },
  plugins: [],
};
