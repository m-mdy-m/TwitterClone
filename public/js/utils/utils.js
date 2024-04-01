// Utility function to get the current path of the window
export const getPath = () => window.location.pathname;

// Utility function to get the message element by ID
export const getMsgElement = () => document.getElementById("msgElm");

// Utility function to check if the user is authenticated
export const isAuth = () => {
  const token = getToken();
  const logged = localStorage.getItem("logged");
  // Check if both token and logged flag are present
  if (token && logged) {
    return true; // User is authenticated
  } else {
    return false; // User is not authenticated
  }
};

// Utility function to check if the welcome photo should be shown
export const showWelcome = () => localStorage.getItem("showWelcomePhoto");

// Utility function to clear the authentication flag from localStorage
export const clearAuth = () => localStorage.removeItem("logged");

// Utility function to set an item in localStorage
export const setItem = (key, value) => localStorage.setItem(key, value);

// Utility function to clear the welcome photo flag from localStorage
export const clearWelcomePhotoFlag = () =>
  localStorage.removeItem("showWelcomePhoto");

// Function to calculate the number of likes for a tweet
export const calculateLikeCount = (tweet) =>
  tweet.likes.length > 0 ? tweet.likes.length : "";

// Function to format the creation time of the tweet
export function getCurrentTimeFormatted(time) {
  // Create a Date object from the provided time
  const createdAt = new Date(time);

  // Get the current time
  const currentTime = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentTime - createdAt;

  // Convert the time difference from milliseconds to seconds
  const secondsDifference = Math.floor(timeDifference / 1000);

  // Define time units in seconds
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = month * 12;

  // Determine the appropriate past tense based on the time difference
  if (secondsDifference < minute) {
    return "just now";
  } else if (secondsDifference < hour) {
    const minutes = Math.floor(secondsDifference / minute);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (secondsDifference < day) {
    const hours = Math.floor(secondsDifference / hour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (secondsDifference < month) {
    const days = Math.floor(secondsDifference / day);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (secondsDifference < year) {
    const months = Math.floor(secondsDifference / month);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    // Format the date and time components separately
    const formattedDate = createdAt.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const formattedTime = createdAt.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    // Concatenate the formatted date and time with a separator
    return `${formattedDate} • ${formattedTime}`;
  }
}
// Function to fetch the CSRF token from the server
export default async function getCSRFToken() {
  try {
    const response = await axios.get("/get-csrf-token");
    return response.data.csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    return null;
  }
}

/**
 * Saves the token in a cookie.
 * @param {string} token - The token to be saved in the cookie.
 */
export function saveToken(token) {
  // Set the token in a cookie
  document.cookie = `token=${token}; path=/;`;
}
/**
 * Removes the token cookie.
 */
export function removeToken() {
  // Set the expiration date to a past time
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
/**
 * Retrieves the value of the token cookie.
 * @returns {string|null} The value of the token cookie, or null if the cookie is not found.
 */
export function getToken() {
  // Extracts the value of the specified cookie by its name
  return getCookieValue("token");
}

/**
 * Parses the document cookies to find the value of a specific cookie by its name.
 * @param {string} cookieName - The name of the cookie to retrieve.
 * @returns {string|null} The value of the specified cookie, or null if the cookie is not found.
 */
export function getCookieValue(cookieName) {
  // Splits the document cookies string into individual cookies
  const cookies = document.cookie.split("; ");

  // Iterates through each cookie to find the one with the specified name
  for (const cookie of cookies) {
    // Splits each cookie into its name and value parts
    const [name, value] = cookie.split("=");

    // Checks if the current cookie's name matches the specified cookie name
    if (name === cookieName) {
      // Returns the value of the matched cookie
      return value;
    }
  }

  // Returns null if the specified cookie is not found
  return null;
}