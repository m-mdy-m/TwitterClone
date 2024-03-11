const { Route } = $read("utils/helper");
const route = new Route();
// const { getHome } = $read("controller/home/home");
route.setRoute("/").get((req, res) => {
  res.redirect("/home");
});
route.setRoute("/home").get((req, res) => {
  const { getReq } = req();
  const { status } = res();
  const request = getReq();
  status(200).render("home", {
    Title: "Home",
    user: request.user,
  });
});

module.exports = route;
