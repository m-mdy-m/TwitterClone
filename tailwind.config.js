/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./frontend/**/*.{html,js}"],
  theme: {
    extend: {
      animation:{
        opacity: "opacity 3s ease-in infinite;"
      },
      fontFamily: {
        mavis: "MAVIS",
        mavis__bold: "MAVIS-Bold",
        mavis__light: "MAVIS-Light",
        Aktiv__regular: "Aktiv-Regular",
        Aktiv__light: "Aktiv-Light",
        Aktiv__medium: "Aktiv-Medium",
        Aktiv__bold: "Aktiv-Bold",
      },
      gridTemplateColumns: {
        container: " 25% minmax(75%, 1fr);",
        main: "80% minmax(20% ,1fr)",
        tweet: "10% minmax(90%,1fr)",
      },
      gridTemplateRows: {
        home: "20% minmax(80% ,1fr)",
        tweet: "60% minmax(40%,1fr)",
        readTweet : "minmax(20%,1fr) 80%",
      },
      backgroundColor: {
        body: "#131314",
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
