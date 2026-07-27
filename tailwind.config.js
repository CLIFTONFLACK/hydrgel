/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Default for body, UI and long-form reading.
        sans: ['Inter', 'system-ui', 'sans-serif'],
        // Brand voice: headings, the wordmark, primary buttons.
        display: ['Montserrat', 'sans-serif'],
      },
      maxWidth: {
        // ~68 characters at our body size — inside the 65–75 readable range.
        measure: '34rem',
      },
    },
  },
  plugins: [],
}
