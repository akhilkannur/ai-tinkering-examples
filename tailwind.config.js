module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#10111A',
        'secondary-bg': '#1D1E2C',
        'accent': '#8A4FFF',
        'text-color': '#EAEAEA',
        'light-purple': '#D0BFFF',
        'bright-pink': '#FF6BFF',
        'electric-blue': '#00FFFF',
        'navy-dark': '#1a2332',
        'navy-light': '#2a3342',
      },
      backgroundImage: {
        'natsume-gradient': 'linear-gradient(120deg, #8A4FFF 0%, #FF6BFF 50%, #00FFFF 100%)',
      }
    },
  },
  plugins: [],
}
