const Xprz = require("xprz");
const {ensureAuthenticated}= $read("middleware/is-auth");
const { Route } = new Xprz();
const route = new Route();
route
  .setRoute("/")
  .using([ensureAuthenticated])
  .get(() => {
    const { status } = route.res();
    status(200).render("home", {
      Title: "Home",
    });
  });

module.exports = route;
