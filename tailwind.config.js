/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        halfBlack: "hsl(0, 0%, 19%)",
      },
      keyframes: {
        up: {
          "0%, 100%": { height: "10000px" },
          "50%": { height: "0px" },
        }
      },
      animation: {
        up: "up 200ms ease-in-out"
      },
    },
  },
  plugins: [],
}
