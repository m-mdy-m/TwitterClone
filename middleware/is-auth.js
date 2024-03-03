exports.ensureAuthenticated = (req, res, nxt) => {
  if (req.session && req.session.user) {
    console.log('nxt()=>',nxt());
    return nxt();
  }
  return res.status(401).redirect("/login");
};
