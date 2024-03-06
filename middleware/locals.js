module.exports = (req, res, nxt) => {
  console.log('req.session.user +>',req.session.user)
  res.locals.isAuth = req.session.user;
  res.locals.csrfToken = req.csrfToken();
  nxt();
};
