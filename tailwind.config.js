/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    screens: {
      sm: "400px",
      // => @media (min-width: 576px) { ... }

      md: "800px",
      // => @media (min-width: 960px) { ... }

      lg: "1440px",
    },
  },

  plugins: [],
  themes: [],
};
