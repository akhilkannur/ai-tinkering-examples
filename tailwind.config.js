module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#fef6e4',
        'secondary-bg': '#fef6e4',
        'accent': '#f582ae',
        'accent-light': '#fce8f0', // New color
        'text-color': '#001858',
        'light-purple': '#172c66',
        'bright-pink': '#f582ae',
        'electric-blue': '#001858',
        'navy-dark': '#001858',
        'navy-light': '#8bd3dd',
        'section-bg-example-card': '#f3d2c1',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        headline: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'natsume-gradient': 'linear-gradient(120deg, #f582ae 0%, #9656a1 50%, #8bd3dd 100%)',
      }
    },
  },
  plugins: [],
}
