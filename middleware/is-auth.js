const Xprz = require("xprz");

const { Package } = new Xprz();
const { jwt } = new Package();

exports.verifyToken = jwt().jwtAuthenticate(process.env.JWT_SECRET);
