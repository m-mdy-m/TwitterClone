const User = require("../../model/User");

exports.findUser = async (req, { status, getJsonHandler }) => {
  const username = req.param("username");
  const { notFound } = getJsonHandler();
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      // If user is not found, send a 404 Not Found response
      return notFound("");
    }
    res.json({ message: "hi" });
  } catch (error) {
    internalServerError(error.message);
  }
};
