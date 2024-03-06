const Xprz = require("xprz");

const { Route } = new Xprz();
const { getLogin, postLogin } = $read("controller/auth/login");
const route = new Route();
route.group("/auth", (r) => {
  r.setRoute("/login").get(getLogin).post(postLogin);
  r.setRoute("/logout").get(() => {
    const { send } = route.res();
    send("hi");
  });
});

module.exports = route;
