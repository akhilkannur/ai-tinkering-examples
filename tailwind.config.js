module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#020617', // Dark Slate 950
        'secondary-bg': '#0f172a', // Dark Slate 900 for cards, sections
        'accent': '#6366f1', // Indigo 500
        'accent-hover': '#4f46e5', // Indigo 600
        'accent-light': '#8b5cf6', // Violet 500 - for gradients
        'text-color': '#e2e8f0', // Slate 200 - primary text
        'text-secondary': '#94a3b8', // Slate 400 - secondary text, descriptions
        'light-purple': '#94a3b8', // Mapped to Slate 400
        'bright-pink': '#8b5cf6', // Violet 500 (retained for gradients)
        'electric-blue': '#ffffff', // White for text on accent buttons
        'navy-dark': '#1e293b', // Slate 800 - for borders, subtle elements
        'navy-light': '#334155', // Slate 700
        'section-bg-example-card': '#1e293b', // Slate 800 for card backgrounds
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        headline: ['Inter', 'sans-serif'], // A more robust headline font
        roboto: ['Roboto', 'sans-serif'], // Retained if used
      },
      backgroundImage: {
        'modern-gradient': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        'subtle-gradient': 'linear-gradient(to bottom, #0f172a, #020617)',
        'hero-gradient': 'radial-gradient(ellipse at top right, #6366f1 0%, transparent 50%), radial-gradient(ellipse at bottom left, #8b5cf6 0%, transparent 50%)',
      },
      boxShadow: {
        'custom-light': '0 10px 15px -3px rgba(226, 232, 240, 0.05), 0 4px 6px -2px rgba(226, 232, 240, 0.025)',
        'accent-glow': '0 0 15px rgba(99, 102, 241, 0.5), 0 0 30px rgba(139, 92, 246, 0.3)',
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
