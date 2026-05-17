/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "sans": "Manrope",
    },
    extend: {
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 24px rgba(139, 92, 246, 0.15)',
        'glow-accent': '0 0 20px rgba(34, 211, 238, 0.1)',
        'glow-lg': '0 0 40px rgba(139, 92, 246, 0.2), 0 0 80px rgba(34, 211, 238, 0.06)',
      },
      colors: {
        'theme': {
          "p": "var(--primary-color)",
          "a": "var(--accent-color)",
          "b": "var(--background-color)",
          "tc": "var(--text-color)",
          "lc": "var(--link-color)",
          "bc": "var(--button-color)",
          "cc": "var(--card-background-color)",
          "sc": "var(--secondary-color)",
        },
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"],
  },
}