/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'col': '1080px', //new
      }
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
}
