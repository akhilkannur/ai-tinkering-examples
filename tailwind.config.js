module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#C0392B', // Brick Red (Build Club BG)
        'secondary-bg': '#FFFDE7', // Paper White (Build Club Card)
        'accent': '#FDF498', // Yellow (Build Club Accent)
        'accent-hover': '#F0D060', // Darker Yellow
        'accent-light': '#FEF9C3', // Light Yellow
        'text-color': '#FFFDE7', // Paper White (Text on Red)
        'text-secondary': '#FDF498', // Yellow (Secondary text)
        'text-inverse': '#1F2937', // Dark Gray (Text on Paper)
        'light-purple': '#3B4E59', // Slate Blue (Build Club Palette)
        'bright-pink': '#88A096', // Sage Green (Build Club Palette)
        'electric-blue': '#1F2937', // Dark Text on accent
        'navy-dark': '#3B4E59', // Slate Blue
        'navy-light': '#556B78', // Lighter Slate Blue
        'section-bg-example-card': '#FFFDE7', // Paper White
        'brand-beige': '#FFFDE7',
        'brand-navy': '#C0392B',
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
