module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#020617', // Slate 950 - Deep Background
        'secondary-bg': '#0F172A', // Slate 900 - Card Background
        'accent': '#F43F5E', // Rose 500 - Vibrant Pink/Red
        'accent-hover': '#E11D48', // Rose 600
        'accent-light': '#FB7185', // Rose 400
        'text-color': '#F8FAFC', // Slate 50 - Main Text
        'text-secondary': '#94A3B8', // Slate 400 - Secondary Text
        'light-purple': '#0EA5E9', // Sky 500
        'bright-pink': '#D946EF', // Fuchsia 500
        'electric-blue': '#F8FAFC', // Text on accent
        'navy-dark': '#1E293B', // Slate 800 - Borders
        'navy-light': '#334155', // Slate 700
        'section-bg-example-card': '#0F172A', // Matches secondary-bg
        'brand-beige': '#020617', // Replaced Beige with Slate 950
        'brand-navy': '#F8FAFC', // Replaced Navy text with Slate 50
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-dm-sans)', 'sans-serif'],
        headline: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
        roboto: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'modern-gradient': 'linear-gradient(135deg, #F43F5E 0%, #D946EF 100%)', // Rose to Fuchsia
        'subtle-gradient': 'linear-gradient(to bottom, #020617, #0F172A)',
        'hero-gradient': 'radial-gradient(ellipse at top right, rgba(244, 63, 94, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom left, rgba(14, 165, 233, 0.1) 0%, transparent 50%)',
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
