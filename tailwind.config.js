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
        'text-secondary': '#FFFDE7', // Use Paper White for secondary on Red for legibility
        'text-inverse': '#000000', // Black text on light backgrounds
        'light-purple': '#3B4E59', // Slate Blue
        'bright-pink': '#88A096', // Sage Green
        'electric-blue': '#000000', 
        'navy-dark': '#000000', // Set to Black for Build Club style
        'navy-light': '#000000', 
        'section-bg-example-card': '#FFFDE7', 
        'brand-beige': '#FFFDE7',
        'brand-navy': '#C0392B',
      },
      fontFamily: {
        sans: ['Bebas Neue', 'var(--font-inter)', 'sans-serif'],
        headline: ['Bebas Neue', 'sans-serif'],
        mono: ['Courier Prime', 'var(--font-space-mono)', 'monospace'],
        roboto: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'modern-gradient': 'none', 
        'subtle-gradient': 'none',
        'hero-gradient': 'none',
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
