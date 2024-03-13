const path = require("path");
exports.getHome = async (req, { status, sendFile }) => {
  try {
    status(200).json({
      message: "hi",
    });
  } catch (error) {
    // If an error occurs, send an error response
    status(500).json({
      success: false,
      error: "Failed to fetch tweets",
    });
  }
};
