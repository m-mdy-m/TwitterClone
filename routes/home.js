const Xprz = require("xprz");
const {ensureAuthenticated} = $read("middleware/is-auth");
const { Route } = new Xprz();
const route = new Route();
route
  .setRoute("/")
  .using([ensureAuthenticated])
  .get(() => {
    const {getReq } = route.req()
    const req = getReq()
    const { status } = route.res();
    status(200).render("home", {
      Title: "Home",
      user : req.user
    });
  });

module.exports = route;
