module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#fec7d7',
        'secondary-bg': '#f9f8fc',
        'accent': '#0e172c',
        'text-color': '#0e172c',
        'light-purple': '#d9d4e7',
        'bright-pink': '#a786df',
        'electric-blue': '#fffffe',
        'navy-dark': '#1a2332',
        'navy-light': '#2a3342',
      },
      backgroundImage: {
        'natsume-gradient': 'linear-gradient(120deg, #fec7d7 0%, #a786df 50%, #d9d4e7 100%)',
      }
    },
  },
  plugins: [],
}
