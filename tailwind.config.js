module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#0C2340', // Navy
        'secondary-bg': '#0B2F48', // Royal - Lighter for cards
        'accent': '#EE5E3E', // Orange
        'accent-hover': '#D64D2E', // Darker Orange
        'accent-light': '#FF7F63', // Lighter Orange
        'text-color': '#F2F1EC', // Beige
        'text-secondary': '#9AB8C7', // Muted Blue-Grey for secondary text
        'light-purple': '#00B0B9', // Mapped to Turquoise
        'bright-pink': '#EE5E3E', // Mapped to Orange
        'electric-blue': '#F2F1EC', // Light text for accent buttons
        'navy-dark': '#003A70', // Denim
        'navy-light': '#204B63', // Green-2
        'section-bg-example-card': '#0B2F48', // Matches secondary-bg
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'], // Proxy for Banana Grotesk
        headline: ['Libre Baskerville', 'serif'], // Proxy for GT Alpina
        mono: ['Space Mono', 'monospace'],
        roboto: ['DM Sans', 'sans-serif'],
      },
      backgroundImage: {
        'modern-gradient': 'linear-gradient(135deg, #EE5E3E 0%, #D64D2E 100%)', // Orange Gradient
        'subtle-gradient': 'linear-gradient(to bottom, #0C2340, #0B2F48)',
        'hero-gradient': 'radial-gradient(ellipse at top right, rgba(238, 94, 62, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom left, rgba(113, 233, 241, 0.05) 0%, transparent 50%)',
      },
      boxShadow: {
        'custom-light': 'none',
        'accent-glow': '0 0 10px rgba(238, 94, 62, 0.2)',
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
