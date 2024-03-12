// Import your header component function here
import Header from './components/header.js'; // Adjust the path as necessary

// Function to insert the header into the DOM
function insertHeader() {
  // Find the element where you want to insert the header
  const headerContainer = document.querySelector('header');

  // Check if the header container exists
  if (headerContainer) {
    // Create a new header element using the header component function
    const headerElement = document.createElement('header');
    headerElement.innerHTML = Header(); // Assuming Header() returns the HTML content of your header component

    // Append the header element to the header container
    headerContainer.appendChild(headerElement);
  }
}

// Call the insertHeader function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', insertHeader);
