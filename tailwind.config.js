/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',    // app klasöründeki tüm js, ts, jsx, tsx dosyalarını hedefle
    './components/**/*.{js,ts,jsx,tsx}',  // components klasöründeki tüm js, ts, jsx, tsx dosyalarını hedefle
    './pages/**/*.{js,ts,jsx,tsx}',   // pages klasöründeki dosyalar da dahil
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1d4ed8',
        secondary: '#10b981',
        danger: '#ef4444',
        dark: '#1f2937',
      }
    },
  },
  plugins: [],
}
