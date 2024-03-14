const { Route } = $read("utils/helper");
const { getSignup, postSignup } = $read("controller/auth/signup");
const route = new Route();
// Grouping authentication-related routes under the "/auth" prefix
route.group("/auth", (r) => {
    // Defining a GET route for the signup page and a POST route for signup action
    r.setRoute("/signup").get(getSignup).post(postSignup);
});

module.exports = route;
