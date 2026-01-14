/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Paleta de colores pasteles
        primary: {
          light: '#E0F2FE',
          DEFAULT: '#7DD3FC',
          dark: '#0284C7',
        },
        secondary: {
          light: '#FCE7F3',
          DEFAULT: '#F9A8D4',
          dark: '#DB2777',
        },
        accent: {
          light: '#FEF3C7',
          DEFAULT: '#FCD34D',
          dark: '#F59E0B',
        },
        success: {
          light: '#D1FAE5',
          DEFAULT: '#6EE7B7',
          dark: '#059669',
        },
      },
      animation: {
        'float-up': 'floatUp 2s ease-out forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-100px) scale(1.5)', opacity: '0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
