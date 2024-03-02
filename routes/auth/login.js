const Xprz = require("xprz");
const { Route } = new Xprz();
const route = new Route();
route.setRoute("/login").get(() => {
  const { status } = route.res();
  status(200).render("auth/login.ejs", {
    Title: "Login",
  });
});
module.exports = route;
