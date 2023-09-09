/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans"],
        Roboto: ["Roboto", "sans"],
        Monsterrat: ["Monsterrat", "sans"],
      },
      fontSize: {
        xs: ["0.5rem", "0.75rem"],
        sm: ["0.625rem", "1rem"],
        md: ["0.875rem", "1.25rem"],
      },
    },
  },
  plugins: [],
};
