/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      transparent: "transparent",
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      red: colors.red,
      yellow: colors.yellow,
      primary: "#262f63",
      secondary: "#4b7531",
      complimentary: "#fbc225",
      sky: "#cae9fa",
      "sky-light": "#e5f4fd",
      "sky-lightest": "#f3fafe",
    },
    extend: {
      dropShadow: {
        flat: "rgba(0, 0, 0, 0.15) 0px 5px 15px",
        "flat-light": "rgba(207, 217, 232, .5) 0px 5px 25px",
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
