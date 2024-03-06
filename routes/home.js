const { Route } = $read("utils/helper");
const getHomeMiddleware = $read("middleware/getHome");
const { getHome } = $read("controller/home/home");
const route = new Route();
route.setRoute("/home").using(getHomeMiddleware).get(getHome);

module.exports = route;
