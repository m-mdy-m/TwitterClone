const { Route } = $read("backend/utils/helper");
const { getSignup, postSignup } = $read("backend/controller/auth/signup");
const route = new Route();
route.group("/auth", (r) => {
    r.setRoute("/signup").get(getSignup).post(postSignup);
});
module.exports = route;
