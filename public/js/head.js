import { CssLinks } from "./components/html/CssLinks.js"; // Importing the CssLinks component from the specified file
import { TITLE } from "./components/html/TITLE.js"; // Importing the TITLE constant from the specified file

// Define the route object
const route = {
  "/home": {
    title: "Home Page", 
    cssPaths: [],
  },
};

// Function to generate HTML content based on route
function generateHTML(path) {
  const routeInfo = route[path]; // Retrieve route information based on the provided path
  if (!routeInfo) {
    return "Route not found"; // Return error message if route information is not found
  }

  // Extract title and cssPaths from routeInfo
  const { title, cssPaths } = routeInfo;

  // Generate HTML content
  return `
    ${TITLE({ title })}
    <link rel="stylesheet" href="/css/base/based.css" /> 
    <link rel="stylesheet" href="/css/components/shared.css" /> 
    ${CssLinks({ paths: cssPaths })}`;
}

// Main function to handle routing and generate HTML
function handleRouting() {
  const path = window.location.pathname; // Retrieve the current path from the window's location
  const htmlContent = generateHTML(path); // Generate HTML content based on the current path
  document.head.innerHTML += htmlContent; // Insert generated HTML content into the document's head
}

// Call handleRouting when the DOM content is loaded
document.addEventListener("DOMContentLoaded", handleRouting);
