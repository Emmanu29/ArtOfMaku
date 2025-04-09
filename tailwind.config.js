/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundSize: {
        'w-10p': '10% auto',
        'w-20p': '20% auto',
        'w-50p': '50% auto',
      },
    },
  },
  plugins: [],
}
