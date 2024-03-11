/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#343a40",
        textPrimary: "#f1f3f5",
      },
    },
  },
  plugins: [],
};
