/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        adomin_1: "#425060",
        adomin_2: "#adb9c6",
        adomin_3: "#647A93",
        adomin_4: "#303b47",
      },
    },
  },
  important: true,
  plugins: [],
};
