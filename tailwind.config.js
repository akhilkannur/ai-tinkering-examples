module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#f0f0f0',
        'secondary-bg': '#ffffff',
        'accent': '#ff00ff', // Magenta
        'punk-lime': '#ccff00', // Lime
        'punk-magenta': '#ff00ff',
        'punk-cyan': '#00ffff',
        'text-color': '#000000',
        'text-secondary': '#1f2937', // Gray 800 for better contrast
        'navy-dark': '#000000',
      },
      fontFamily: {
        sans: ['"Space Mono"', 'monospace'],
        display: ['"Archivo Black"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      backgroundImage: {
        'punk-dots': 'radial-gradient(#000 1px, transparent 1px)',
      },
      boxShadow: {
        'brutalist': '6px 6px 0px 0px #000',
        'brutalist-sm': '3px 3px 0px 0px #000',
      },
      borderWidth: {
        '4': '4px',
      },
    },
  },
  plugins: [],
}
