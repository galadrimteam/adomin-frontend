/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        adomin_1: "#425060",
        adomin_2: "#334155",
        adomin_3: "#F1F5F9",
        adomin_4: "#FCFCFD",
        adomin_5: "#E2E8F0",
        adomin_6: "#F8FAFC",
      },
    },
  },
  important: true,
  plugins: [],
};
