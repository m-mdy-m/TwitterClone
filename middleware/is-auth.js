exports.ensureAuthenticated = (req, res, nxt) => {
  if (req.session && req.session.user) {
    return nxt();
  }
  return res.status(401).redirect("/login");
};
