const { Route } = $read("utils/helper");
const { getLogin, postLogin } = $read("controller/auth/login");
const route = new Route();
route.group("/auth", (r) => {
  r.setRoute("/login").get(getLogin).post(postLogin);
  r.setRoute("/logout").post(() => {
    const { getRes,getJsonHandler } = r.res();
    const {success } = getJsonHandler()
    const { getReq,error } = r.req();
    const req = getReq(),
      res = getRes();
      if (req.session) {
        req.session.destroy((err) => {
          if (err) {
            error(500,'Failed to delete session');
          } else {
            success('Session deleted successfully');
          }
        });
      } else {
        error(404,'User not logged in');
      }
  });
});

module.exports = route;
