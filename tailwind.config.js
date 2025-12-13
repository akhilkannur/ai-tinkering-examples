module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#0f172a', // Slate 900 - Softer than pure black
        'secondary-bg': '#1e293b', // Slate 800 - Lighter for cards
        'accent': '#D4FF00', // Acid Green
        'accent-hover': '#B8DE00', // Slightly darker Acid Green
        'accent-light': '#E2FF5C', // Lighter Acid Green
        'text-color': '#f8fafc', // Slate 50 - Brighter white
        'text-secondary': '#cbd5e1', // Slate 300 - Much higher contrast
        'light-purple': '#cbd5e1', // Mapped to Dimmed Grey for compatibility
        'bright-pink': '#D4FF00', // Mapped to Acid Green for compatibility
        'electric-blue': '#0f172a', // Dark text for accent buttons
        'navy-dark': '#334155', // Slate 700 - Visible borders
        'navy-light': '#475569', // Slate 600 - Lighter borders
        'section-bg-example-card': '#1e293b', // Matches secondary-bg
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
