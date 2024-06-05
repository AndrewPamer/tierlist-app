/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        darkest: "#363946",
        dark: "#696773",
        light: "#819595",
        lightest: "#B1B6A6",
        background: "rgba(var(--background))",
        text: "rgba(var(--text))",
        "button-bg": "rgba(var(--button-background))",
        "button-text": "rgba(var(--button-text))",
        "button-hover": "rgba(var(--button-hover))",

        "input-bg": "rgba(var(--input-bg))",

        error: "rgba(var(--error-text))",
      },
    },
  },
  plugins: [],
};
