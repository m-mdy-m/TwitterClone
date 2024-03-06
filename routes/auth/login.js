const { Route } = $read("utils/helper");
const { getLogin,postLogin } = $read('controller/auth/login')
const route = new Route();
route.setRoute("/login").get(getLogin).post(postLogin)
module.exports = route;
