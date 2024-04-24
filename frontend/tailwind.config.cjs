/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      cyberBase: "#1E1210",
      cyberAccent: "#FFE200",
      cyberSub: "#C3D82D",
      blue: "#007bff",
      red: "#c53030",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
