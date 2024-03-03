const Xprz = require("xprz");
const { ensureAuthenticated } = $read("middleware/is-auth");
const { getHome } = $read("controller/home/home");
const { Route } = new Xprz();
const route = new Route();
route.setRoute("/").using([ensureAuthenticated]).get(getHome);

module.exports = route;
