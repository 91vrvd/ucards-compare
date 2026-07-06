/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0d1117',
        'card-dark': '#161b22',
        'border-dark': '#30363d',
        'gold': '#f0b90b',
        'gold-hover': '#d4a30a',
        'green-cyber': '#00d4aa',
        'red-cyber': '#ff4b4b',
      }
    },
  },
  plugins: [],
}
