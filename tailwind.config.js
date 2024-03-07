/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      gridTemplateColumns: {
        container: " 30% minmax(70%, 1fr);",
      },
      backgroundColor: {
        body: "#101011",
      },
      container: {
        center: true,
        padding: 0,
        screens: {
          mobile: "300px", // Mobile screens (default)
          smallTb: "600px", // Small tablets
          tablet: "900px", // Tablets
          desktops: "1050px", // Desktops
          large: "1536px", // Large desktops
        },
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
