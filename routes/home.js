const { Route } = $read("utils/helper");
const route = new Route();
const { getHome } = $read("controller/home/home");
route.setRoute("/").get((req, res) => {
  res.redirect("/home");
});
route.setRoute("/home").get(getHome);

module.exports = route;
