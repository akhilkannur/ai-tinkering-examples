module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#fef6e4',
        'secondary-bg': '#fef6e4',
        'accent': '#f582ae',
        'text-color': '#001858',
        'light-purple': '#172c66',
        'bright-pink': '#9656a1',
        'electric-blue': '#001858',
        'navy-dark': '#140d0b',
        'navy-light': '#e78fb3',
      },
      backgroundImage: {
        'natsume-gradient': 'linear-gradient(120deg, #f582ae 0%, #9656a1 50%, #e78fb3 100%)',
      }
    },
  },
  plugins: [],
}
