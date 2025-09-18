module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#004643',
        'secondary-bg': '#fff3ec',
        'accent': '#f9bc60',
        'text-color': '#fffffe',
        'light-purple': '#abd1c6',
        'bright-pink': '#9656a1',
        'electric-blue': '#001e1d',
        'navy-dark': '#140d0b',
        'navy-light': '#e78fb3',
      },
      backgroundImage: {
        'natsume-gradient': 'linear-gradient(120deg, #f9bc60 0%, #9656a1 50%, #e78fb3 100%)',
      }
    },
  },
  plugins: [],
}
