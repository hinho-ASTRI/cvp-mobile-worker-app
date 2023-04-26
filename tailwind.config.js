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
    // => @media (min-width: 1440px) { ... }
    // fontSize: {
    //   xs: ".75rem",
    //   sm: ".875rem",
    //   base: "1rem",
    //   lg: "1.125rem",
    //   xl: "1.25rem",
    //   "2xl": "1.5rem",
    //   "3xl": "1.875rem",
    //   "4xl": "2.25rem",
    //   "5xl": "3rem",
    //   "6xl": "4rem",
    // },
  },

  plugins: [],
  themes: [],
};
