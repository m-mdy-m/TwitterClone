/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      fontFamily:{
        mavis : "MAVIS",
        mavis__bold : "MAVIS-Bold",
        mavis__light : "MAVIS-Light",
        Aktiv__regular : "Aktiv-Regular",
        Aktiv__light : "Aktiv-Light",
        Aktiv__medium : "Aktiv-Medium",
        Aktiv__bold : "Aktiv-Bold",
      },
      gridTemplateColumns: {
        container: " 25% minmax(75%, 1fr);",
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
          desktop: "1050px", // Desktops
          large: "1536px", // Large desktops
        },
      },
      screens: {
        mobile: "250px", // Mobile screens (default)
        smallTb: "600px", // Small tablets
        tablet: "900px", // Tablets
        desktop: "1050px", // Desktops
        large: "1536px", // Large desktops
      },
    },
  },
  plugins: [],
};
