/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EBF5FF',
          100: '#D6EBFF',
          200: '#ADD6FF',
          300: '#84C1FF',
          400: '#5AABFF',
          500: '#1A73E8', // Primary blue
          600: '#1766D0',
          700: '#1458B8',
          800: '#1149A0',
          900: '#0E3A88',
        },
        accent: {
          50: '#FFF0EB',
          100: '#FFE0D6',
          200: '#FFC2AD',
          300: '#FFA384',
          400: '#FF855A',
          500: '#FF5722', // Sunset orange
          600: '#E64A1C',
          700: '#CC4017',
          800: '#B33613',
          900: '#992C0F',
        },
        success: {
          500: '#4CAF50', // Sage green
        },
        warning: {
          500: '#FFC107',
        },
        error: {
          500: '#F44336',
        }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s linear infinite',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}