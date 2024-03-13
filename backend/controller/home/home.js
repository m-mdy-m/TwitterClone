const path = require("path");
exports.getHome = async (req, { status, sendFile }) => {
  try {
    // Send the HTML file to the client
    // sendFile(path.join(process.cwd(), "/frontend/html/home.html"));
  } catch (error) {
    // If an error occurs, send an error response
    status(500).json({
      success: false,
      error: "Failed to fetch tweets",
    });
  }
};
