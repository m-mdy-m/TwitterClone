const { Route } = $read("utils/HelperXprz");
const route = new Route();
const { ensureAuthenticated } = $read("middleware/is-auth")
const { getHome } = $read("controller/home/home");
route.setRoute("/").get((req, { redirect }) => redirect("/home"));
route.setRoute("/home").using([ensureAuthenticated]).get(getHome);

module.exports = route;
