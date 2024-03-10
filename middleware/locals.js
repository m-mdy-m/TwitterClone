module.exports = (req, res, nxt) => {
  res.locals.isAuth = req.session.user;
  nxt();
};
