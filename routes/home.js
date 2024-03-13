const { Route } = $read("utils/helper");
const route = new Route();
const { getHome } = $read("controller/home/home");
route.setRoute("/").get((req, { redirect }) => redirect("/home"));
route.setRoute("/home").get(getHome);

module.exports = route;
