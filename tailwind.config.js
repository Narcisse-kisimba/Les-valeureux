/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        violet: { DEFAULT: "#3B1E70", dark: "#241147" },
        or: { DEFAULT: "#D4AF37", light: "#F0D878" }
      }
    }
  },
  plugins: []
}
