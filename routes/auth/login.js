const { Route } = $read("utils/helper");
const { getLogin, postLogin } = $read("controller/auth/login");
const route = new Route();
route.group("/auth", (r) => {
  r.setRoute("/login").get(getLogin).post(postLogin);
  r.setRoute("/logout").post((req, res) => {
    const { getJsonHandler } = res();
    const { success } = getJsonHandler();
    const { error } = req();
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          error(500, "Failed to delete session");
        } else {
          success("Session deleted successfully");
        }
      });
    } else {
      error(404, "User not logged in");
    }
  });
});

module.exports = route;
