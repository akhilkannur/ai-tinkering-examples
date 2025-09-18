module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#004643',
        'secondary-bg': '#e8e4e6',
        'accent': '#f9bc60',
        'text-color': '#fffffe',
        'light-purple': '#abd1c6',
        'bright-pink': '#e16162',
        'electric-blue': '#001e1d',
        'navy-dark': '#1a2332',
        'navy-light': '#2a3342',
      },
      backgroundImage: {
        'natsume-gradient': 'linear-gradient(120deg, #f9bc60 0%, #e16162 50%, #abd1c6 100%)',
      }
    },
  },
  plugins: [],
}
