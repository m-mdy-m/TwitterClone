const Xprz = require("xprz");

const { Route } = new Xprz();
const route = new Route();
route.setRoute("/").get(() => {
  const { send } = route.res();
  send("hi");
});

module.exports = route;
