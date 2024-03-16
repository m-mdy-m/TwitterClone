const path = require("path");
// Controller function to handle requests for the home page
exports.getHome = async (req, { status, sendFile }) => {
  try {
    // Send the HTML file for the home page to the client
    sendFile(path.join(process.cwd(), "/public/views/main.html"));
  } catch (error) {
    // If an error occurs while sending the file, send an error response
    status(500).json({
      success: false,
      error: "Failed to fetch tweets",
    });
  }
};
