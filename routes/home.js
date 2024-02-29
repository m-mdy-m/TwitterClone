const Xprz = require("xprz");
const isAuth = require("../middleware/is-auth").isAuth;
const { Route } = new Xprz();
const route = new Route();
route
  .setRoute("/")
  .using(isAuth)
  .get(() => {
    const { status } = route.res();
    status(200).render("home", {
      Title: "Home",
    });
  });

module.exports = route;
