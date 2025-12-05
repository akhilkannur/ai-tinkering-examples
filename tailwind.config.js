module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#ffffff',
        'secondary-bg': '#f8fafc', // Slate 50
        'accent': '#6366f1', // Indigo 500
        'accent-hover': '#4f46e5', // Indigo 600
        'accent-light': '#e0e7ff', // Indigo 100
        'text-color': '#0f172a', // Slate 900
        'text-secondary': '#475569', // Slate 600
        'light-purple': '#64748b', // Mapped to Slate 500 for backward compatibility
        'bright-pink': '#8b5cf6', // Violet 500
        'electric-blue': '#ffffff', // White text on accent buttons
        'navy-dark': '#1e293b', // Slate 800
        'navy-light': '#cbd5e1', // Slate 300
        'section-bg-example-card': '#f1f5f9', // Slate 100
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        headline: ['Plus Jakarta Sans', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'modern-gradient': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        'subtle-gradient': 'linear-gradient(to bottom, #f8fafc, #ffffff)',
      }
    },
  },
  plugins: [],
}
