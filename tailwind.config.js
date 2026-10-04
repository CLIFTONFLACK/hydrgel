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
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        // Entrance for hero copy. Use with motion-safe:.
        rise: 'rise 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both',
      },
      maxWidth: {
        // ~68 characters at our body size — inside the 65–75 readable range.
        measure: '34rem',
      },
    },
  },
  plugins: [],
}
