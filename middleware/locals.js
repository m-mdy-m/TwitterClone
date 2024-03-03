module.exports = (req, res, nxt) => {
  res.locals.isAuth = req.session.isLogged;
  res.locals.csrfToken = req.csrfToken();
  nxt();
};
