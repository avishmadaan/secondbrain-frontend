/** @type {import('tailwindcss').Config} */
export default {
  content: [  "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        softGray:"#F9FBFC",
        purple:{
          300:"#E1E7FE",
          500: "#5047E5"
        }
      }
    },
  },
  plugins: [],
}

