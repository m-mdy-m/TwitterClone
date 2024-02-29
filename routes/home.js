const Xprz = require("xprz");

const { Route } = new Xprz();
const { setRoute, res, default: route } = new Route();
setRoute("/").get(() => {
  const { send } = res();
  send("hi");
});

module.exports = route;
