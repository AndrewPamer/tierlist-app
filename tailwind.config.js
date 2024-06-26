/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
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

        "alt-bg": "rgba(var(--alt-bg))",
        "alt-bg-darker": "rgba(var(--alt-bg-darker))",

        confirm: "rgba(var(--confirm-bg))",
        deny: "rgba(var(--deny-bg))",

        error: "rgba(var(--error-text))",
      },
    },
  },
  plugins: [],
});
