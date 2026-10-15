/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        github: {
          empty: '#161b22',
          level1: '#0e4429',
          level2: '#006d32',
          level3: '#26a641',
          level4: '#39d353',
        }
      }
    },
  },
  plugins: [],
}