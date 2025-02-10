import daisyui from "daisyui"

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
          DEFAULT: '#4F46E5', // You can change this to match your brand color
          50: '#EEF2FF',
          // ... add more shades if needed
        }
      }
    }
  },
  plugins: [daisyui,],

  daisyui: {
    themes: ["light", "dark", "coffee","autumn"],
  },
}
// #4F46E5
//EEF2FF