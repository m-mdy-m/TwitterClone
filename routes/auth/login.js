const { Route } = $read("utils/helper");
const { getLogin, postLogin } = $read("controller/auth/login");
const route= new Route();
route.group("/auth", (r) => {
  r.setRoute("/login").get(getLogin).post(postLogin);
  r.setRoute("/logout").get(() => {
    const { send } = r.res();
    send("hi");
  });
});

module.exports = route;
