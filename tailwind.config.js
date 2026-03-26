module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'page-bg': '#ffffff',
        'hero-tint': '#fcf9f7',
        'primary-text': '#111111',
        'secondary-text': '#666666',
        'light-placeholder': '#999999',
        'accent-dark': '#141414',
        'border-color': '#eaeaea',
        'card-image-bg': '#f5ece5',
        'search-glow': 'rgba(234, 201, 181, 0.2)',
        // Keeping old colors for compatibility during transition if needed, 
        // but they should be phased out on the homepage.
        'punk-lime': '#ccff00',
        'punk-magenta': '#ff00ff',
        'punk-cyan': '#00ffff',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '48px',
        'xxl': '80px',
      },
      borderRadius: {
        'sm': '6px',
        'md': '12px',
        'pill': '99px',
      },
      boxShadow: {
        'search': '0 8px 30px rgba(234, 201, 181, 0.2)',
        'card-hover': '0 10px 30px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
