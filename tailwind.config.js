/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans"],
        Roboto: ["Roboto", "sans"],
        Monsterrat: ["Monsterrat", "sans"],
        NotoEmoji: ["Noto Emoji", "sans"],
        NotoColorEmoji: ["Noto Color Emoji", "sans"],
      },
      fontSize: {
        xs: ["0.625rem", "0.75rem"],
        sm: ["0.75rem", "1rem"],
        md: ["0.875rem", "1.25rem"],
      },
      gridTemplateColumns: {
        "3/9": "repeat(12, minmax(0, 3fr) minmax(0, 9fr))",
      },
    },
  },
  plugins: [],
};
