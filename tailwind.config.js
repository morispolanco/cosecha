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
          50: '#f0f9f0',
          100: '#dcf1dc',
          200: '#bbe1bc',
          300: '#8ec78f',
          400: '#5ba65d',
          500: '#3d8a3f',
          600: '#2d6d2f',
          700: '#265727',
          800: '#224623',
          900: '#1d3a1e',
          950: '#0d200e',
        },
        earth: {
          50: '#f7f6f2',
          100: '#eceae0',
          200: '#d9d4c1',
          300: '#beb598',
          400: '#a49673',
          500: '#8f7e5d',
          600: '#7a674d',
          700: '#645441',
          800: '#54463a',
          900: '#483d34',
          950: '#29221d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
