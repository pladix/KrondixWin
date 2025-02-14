/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
      transitionDuration: {
        '5000': '5000ms',
      },
    },
  },
  safelist: [
    'from-yellow-400',
    'to-yellow-600',
    'from-purple-400',
    'to-purple-600',
    'from-blue-400',
    'to-blue-600',
    'from-green-400',
    'to-green-600',
    'from-gray-400',
    'to-gray-600',
  ],
  plugins: [],
};