const path = require("path");
exports.getHome = async (req, { status, sendFile }) => {
  try {
    // Send the HTML file to the client
  } catch (error) {
    // If an error occurs, send an error response
    status(500).json({
      success: false,
      error: "Failed to fetch tweets",
    });
  }
};
