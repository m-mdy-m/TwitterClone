const { Route } = $read("utils/helper");
const { ensureAuthenticated } = $read("middleware/is-auth");
const { getHome } = $read("controller/home/home");
const route = new Route();
route.setRoute("/").using([ensureAuthenticated]).get(getHome);

module.exports = route;
