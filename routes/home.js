const { Route } = $read("utils/helper");
const route = new Route();
const redirectToHome = $read("middleware/redirectToHome");
const { getHome } = $read("controller/home/home");
route.setRoute("/home").using(redirectToHome).get(getHome);

module.exports = route;
