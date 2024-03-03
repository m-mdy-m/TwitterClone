const Xprz = require("xprz");
const ensureAuthenticated = $read("middleware/is-auth").ensureAuthenticated;
const test = $read("middleware/is-auth").test;
const { Route } = new Xprz();
const route = new Route();
route
  .setRoute("/")
  .using([ensureAuthenticated , test])
  .get(() => {
    const { status } = route.res();
    status(200).render("home", {
      Title: "Home",
    });
  });

module.exports = route;
