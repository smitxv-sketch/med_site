/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Vibrant brand colors based on the design code
        brand: {
          green: '#4CAF50',
          lightGreen: '#8BC34A',
          orange: '#FF5722',
          lightOrange: '#FFCC80',
          violet: '#673AB7',
          lightViolet: '#B39DDB',
          blue: '#03A9F4',
          turquoise: '#4DB6AC',
        },
        // We map the primary 'teal' used in the app to the new Brand Green
        // to automatically update the app's primary color to green.
        teal: {
          50: '#e8f5e9',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#4CAF50', // Brand Green
          600: '#43a047',
          700: '#388e3c',
          800: '#2e7d32',
          900: '#1b5e20',
          950: '#000000',
        },
        orange: {
          50: '#fbe9e7',
          100: '#ffccbc',
          200: '#ffab91',
          300: '#ff8a65',
          400: '#ff7043',
          500: '#FF5722', // Brand Orange
          600: '#f4511e',
          700: '#e64a19',
          800: '#d84315',
          900: '#bf360c',
          950: '#000000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
