module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Nerdy Idealist Palette - Technical & Practical
        'page-bg': '#faf9f7',
        'hero-tint': '#ffffff',
        'primary-text': '#1a1a1a',
        'secondary-text': '#4a4a4a',
        'light-placeholder': '#9ca3af',
        'accent-dark': '#0a0a0a',
        'border-color': '#e5e5e5',
        'card-image-bg': '#faf9f7',
        'search-glow': 'rgba(0, 0, 0, 0.08)',
        // Coffee tones (kept for warmth)
        'coffee': {
          50: '#faf9f7',
          100: '#f5f2eb',
          200: '#e8e1d5',
          300: '#d1c4b2',
          400: '#b5a38c',
          500: '#9e754a',
          600: '#855e37',
          700: '#664526',
          800: '#4a331c',
          900: '#2d2a26',
        },
        // Terminal/Technical accents
        'terminal': {
          green: '#22c55e',
          lime: '#ccff00',
          cyan: '#06b6d4',
        },
        // Hyperlink blue for CTAs
        'link-blue': '#3b82f6',
        // Figment Palette
        'figment-bg': '#FFAAFA',
        'figment-grid': '#F184EB',
        'figment-brand': '#EF3922',
        'figment-card-dark': '#0E0E0E',
        'figment-card-green': '#1B7F4E',
        'figment-card-orange': '#F46927',
        'figment-card-light': '#F2F2F2',
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Fredoka', '"Archivo Black"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'monospace'],
        // Figment Fonts
        syne: ['Syne', 'sans-serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '48px',
        'xxl': '80px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'pill': '99px',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'soft-hover': '0 12px 30px -4px rgba(0, 0, 0, 0.1)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
        'search': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'brutalist': '6px 6px 0px 0px #0a0a0a',
        'brutalist-sm': '3px 3px 0px 0px #0a0a0a',
        'card-hover': '0 10px 30px rgba(0, 0, 0, 0.05)',
        'technical': '0 0 0 1px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
