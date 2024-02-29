const Xprz = require("xprz");

const { Route } = new Xprz();
const route = new Route();
route.setRoute("/").get(() => {
  const { status } = route.res();
  status(200).render("home",{
    Title : "Home"
  });
});

module.exports = route;
