module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#F2F1EC', // Beige - Main Light Background
        'secondary-bg': '#FFFFFF', // White - Card Background
        'accent': '#EE5E3E', // Orange - Buttons/Highlights
        'accent-hover': '#D64D2E', // Darker Orange
        'accent-light': '#FF7F63', // Lighter Orange
        'text-color': '#0C2340', // Navy - Main Text
        'text-secondary': '#003A70', // Denim - Muted Text
        'light-purple': '#00B0B9', // Turquoise
        'bright-pink': '#EE5E3E', // Orange
        'electric-blue': '#F2F1EC', // Light text for accent buttons
        'navy-dark': '#0C2340', // Navy - Strong Borders
        'navy-light': '#204B63', // Green-2
        'section-bg-example-card': '#FFFFFF', // White
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        headline: ['Libre Baskerville', 'serif'],
        mono: ['Space Mono', 'monospace'],
        roboto: ['DM Sans', 'sans-serif'],
      },
      backgroundImage: {
        'modern-gradient': 'linear-gradient(135deg, #EE5E3E 0%, #D64D2E 100%)', // Orange Gradient
        'subtle-gradient': 'linear-gradient(to bottom, #F2F1EC, #E2E1DC)', // Light Beige Gradient
        'hero-gradient': 'radial-gradient(ellipse at top right, rgba(238, 94, 62, 0.05) 0%, transparent 50%), radial-gradient(ellipse at bottom left, rgba(113, 233, 241, 0.05) 0%, transparent 50%)',
      },
      boxShadow: {
        'custom-light': '0 4px 6px -1px rgba(12, 35, 64, 0.1), 0 2px 4px -1px rgba(12, 35, 64, 0.06)', // Navy shadow
        'accent-glow': '0 0 15px rgba(238, 94, 62, 0.3)',
      },
      animation: {
        'background-pan': 'background-pan 10s ease infinite',
        'blob-pulse': 'blob 7s infinite',
      },
      keyframes: {
        'background-pan': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        }
      },
    },
  },
  plugins: [],
}
