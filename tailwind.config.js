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
          navy: '#06281E',
          forest: '#08302A',
          emerald: '#059669',
          'emerald-hover': '#047857',
          'emerald-light': '#ECFDF5',
          gold: '#C59B4B',
          'gold-dark': '#936F1E',
          'gold-hover': '#B38838',
          'gold-light': '#FEF9EE',
          'gold-border': '#E8D3A7',
        }
      },
      fontFamily: {
        heading: ['Outfit', '"Plus Jakarta Sans"', 'sans-serif'],
        brand: ['Outfit', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
