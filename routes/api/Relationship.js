const { expose, group, mids } = require("xprz").Route();
const { updateFollowStatus } = $read("controller/api/relationship");
const { verifyToken } = $read("middleware/is-auth");
mids([verifyToken]);
group("/api", (r) => {
  r.route("/follow-status").put(updateFollowStatus);
});

module.exports = expose;
