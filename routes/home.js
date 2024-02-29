const Xprz = require("xprz");

const { Route } = new Xprz();
const route = new Route();
route.setRoute("/").get(() => {
  const { render, status } = route.res();
  status(200).render("home");
});

module.exports = route;
