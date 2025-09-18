module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#fffffe',
        'secondary-bg': '#ff5470',
        'accent': '#00ebc7',
        'text-color': '#00214d',
        'light-purple': '#1b2d45',
        'bright-pink': '#fde240',
        'electric-blue': '#00214d',
        'navy-dark': '#00214d',
        'navy-light': '#2a3342',
      },
      backgroundImage: {
        'natsume-gradient': 'linear-gradient(120deg, #00ebc7 0%, #fde240 50%, #ff5470 100%)',
      }
    },
  },
  plugins: [],
}
