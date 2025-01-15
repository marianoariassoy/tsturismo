/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#e63c1f'
      },
      fontFamily: {
        sans: ['Kanit', 'sans-serif'],
        serif: ['Kanit', 'serif']
      }
    }
  },
  plugins: [require('tailwindcss-animated')]
}
