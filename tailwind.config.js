/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        readly: {
          dark: '#0B4635',
          navy: '#063326',
          emerald: '#059669',
          'emerald-hover': '#047857',
          'emerald-light': '#ECFDF5',
          gold: '#C59B4B',
          'gold-hover': '#B38838',
          'gold-light': '#FEF9EE',
        }
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
