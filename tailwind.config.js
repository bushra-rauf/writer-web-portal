/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F4E78',
        secondary: '#4472C4',
        accent: '#ED7D31',
      },
      spacing: {
        'safe': 'max(1rem, env(safe-area-inset-left))',
      },
    },
  },
  plugins: [],
};
