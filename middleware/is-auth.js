function ensureAuthenticated(statuscode = 401, redirect = "/signup") {
  return (req, res, nxt) => {
    if (req.session && req.session.user) {
      return nxt();
    }
    return res.status(statuscode).redirect(redirect);
  };
}
module.exports = {ensureAuthenticated }