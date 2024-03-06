module.exports = (req, res, nxt) => {
  res.locals.isAuth = req.session.user;
  res.locals.csrfToken = req.csrfToken();
  nxt();
};
