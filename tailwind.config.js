module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#fffffe',
        'secondary-bg': '#f2eef5',
        'accent': '#4fc4cf',
        'text-color': '#181818',
        'light-purple': '#2e2e2e',
        'bright-pink': '#fbdd74',
        'electric-blue': '#181818',
        'navy-dark': '#181818',
        'navy-light': '#994ff3',
      },
      backgroundImage: {
        'natsume-gradient': 'linear-gradient(120deg, #4fc4cf 0%, #fbdd74 50%, #994ff3 100%)',
      }
    },
  },
  plugins: [],
}
