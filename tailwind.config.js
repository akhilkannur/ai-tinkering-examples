module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#fffffe',
        'secondary-bg': '#e3f6f5',
        'accent': '#ffd803',
        'text-color': '#272343',
        'light-purple': '#2d334a',
        'bright-pink': '#bae8e8',
        'electric-blue': '#272343',
        'navy-dark': '#1a2332',
        'navy-light': '#2a3342',
      },
      backgroundImage: {
        'natsume-gradient': 'linear-gradient(120deg, #ffd803 0%, #bae8e8 50%, #e3f6f5 100%)',
      }
    },
  },
  plugins: [],
}
