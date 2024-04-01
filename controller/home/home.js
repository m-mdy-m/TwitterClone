const path = require("path");
// Controller function to handle requests for the home page
exports.getHome = async ({ status, sendFile }) => {
  try {
    // Send the HTML file for the home page to the client
    sendFile(path.join(process.cwd(), "/public/main.html"));
  } catch (error) {
    console.log("error=>", error);
    // If an error occurs while sending the file, send an error response
    status(500).json({
      success: false,
      error: "Failed to fetch tweets",
    });
  }
};
