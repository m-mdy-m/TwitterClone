const { Route } = $read("backend/utils/helper");
const route = new Route();
const { getHome } = $read("backend/controller/home/home");
route.setRoute("/").get((req, { redirect }) => redirect("/home"));
route.setRoute("/home").get(getHome);

module.exports = route;
