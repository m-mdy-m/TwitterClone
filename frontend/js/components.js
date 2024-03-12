// Import your header component function here
import Header from "./components/header.js"; // Adjust the path as necessary

// Function to insert the header into the DOM
function insertHeader() {
  // Find the element where you want to insert the header
  const headerContainer = document.querySelector("header");

  // Check if the header container exists
  if (headerContainer) {
    // Append the header element to the header container
    headerContainer.innerHTML = Header();
  }
}

// Call the insertHeader function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", insertHeader());
