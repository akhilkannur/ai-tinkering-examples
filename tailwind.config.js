module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#f2f7f5',
        'secondary-bg': '#ffa8ba',
        'accent': '#faae2b',
        'text-color': '#00473e',
        'light-purple': '#475d5b',
        'bright-pink': '#fa5246',
        'electric-blue': '#00473e',
        'navy-dark': '#00332c',
        'navy-light': '#2a3342',
      },
      backgroundImage: {
        'natsume-gradient': 'linear-gradient(120deg, #faae2b 0%, #fa5246 50%, #ffa8ba 100%)',
      }
    },
  },
  plugins: [],
}
