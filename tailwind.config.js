module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#050505', // Matte Black
        'secondary-bg': '#0B0E14', // Darker Slate/Black for cards
        'accent': '#D4FF00', // Acid Green
        'accent-hover': '#B8DE00', // Slightly darker Acid Green
        'accent-light': '#E2FF5C', // Lighter Acid Green
        'text-color': '#EEEEEE', // Off-white
        'text-secondary': '#888888', // Dimmed Grey
        'light-purple': '#888888', // Mapped to Dimmed Grey for compatibility
        'bright-pink': '#D4FF00', // Mapped to Acid Green for compatibility
        'electric-blue': '#050505', // Black text for accent buttons
        'navy-dark': '#222222', // Dark Grey for borders
        'navy-light': '#333333', // Slightly lighter grey
        'section-bg-example-card': '#0B0E14', // Matches secondary-bg
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        headline: ['Space Mono', 'monospace'], // Monospace for headlines
        mono: ['Space Mono', 'monospace'], // Explicit mono utility
        roboto: ['Inter', 'sans-serif'], // Fallback
      },
      backgroundImage: {
        'modern-gradient': 'linear-gradient(135deg, #D4FF00 0%, #B8DE00 100%)', // Acid Green Gradient
        'subtle-gradient': 'linear-gradient(to bottom, #0B0E14, #050505)',
        'hero-gradient': 'radial-gradient(ellipse at top right, rgba(212, 255, 0, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom left, rgba(212, 255, 0, 0.05) 0%, transparent 50%)',
      },
      boxShadow: {
        'custom-light': 'none', // Removed soft shadow
        'accent-glow': '0 0 10px rgba(212, 255, 0, 0.2)', // Sharper, smaller glow if needed
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
