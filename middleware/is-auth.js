exports.ensureAuthenticated = (statuscode = 401, redirect = "/signup") => {
  return (req, res, nxt) => {
    if (req.session && req.session.user) {
      nxt();
    } else {
      res.status(statuscode).redirect(redirect);
    }
  };
};
