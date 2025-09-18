module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#55423d',
        'secondary-bg': '#fff3ec',
        'accent': '#ffc0ad',
        'text-color': '#fffffe',
        'light-purple': '#fff3ec',
        'bright-pink': '#9656a1',
        'electric-blue': '#271c19',
        'navy-dark': '#140d0b',
        'navy-light': '#e78fb3',
      },
      backgroundImage: {
        'natsume-gradient': 'linear-gradient(120deg, #ffc0ad 0%, #9656a1 50%, #e78fb3 100%)',
      }
    },
  },
  plugins: [],
}
