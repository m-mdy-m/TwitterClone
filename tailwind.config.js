/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      container: {
        center: true,
      },
      screens: {
        mobile: "300px", // Mobile screens (default)
        smallTb: "600px", // Small tablets
        tablet: "900px", // Tablets
        desktops: "1050px", // Desktops
        large: "1536px", // Large desktops
      },
    },
  },
  plugins: [],
};
