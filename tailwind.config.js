module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#fef6e4',
        'secondary-bg': '#f3d2c1',
        'accent': '#f582ae',
        'text-color': '#001858',
        'light-purple': '#172c66',
        'bright-pink': '#f582ae',
        'electric-blue': '#001858',
        'navy-dark': '#1a2332',
        'navy-light': '#2a3342',
      },
      backgroundImage: {
        'natsume-gradient': 'linear-gradient(120deg, #fef6e4 0%, #f582ae 50%, #8bd3dd 100%)',
      }
    },
  },
  plugins: [],
}
