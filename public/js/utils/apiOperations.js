import {
  AddTweet,
  ShowTweets,
  attachIconClickListeners,
} from "../tweets/tweetHandlers.js";
import {
  getAuthHeaders,
  handleNotSuccess,
  handleServerError,
  handleSuccess,
  showMessage,
} from "./helper.js";
import {
  clearAuth,
  clearWelcomePhotoFlag,
  getMsgElement,
  removeToken,
  saveToken,
  setItem,
} from "./utils.js";
const msgElm = getMsgElement();


// Function to Signup or Login user
export async function authenticateUser(url,requestData,header,form,btn,oldValue) {
  try {
    const response = await axios.post(url, requestData, header);
    // Handle server response based on success or failure
    if (response.data.success) {
      const token = response.data.data.token;
      saveToken(token); // Save token to cookie
      // If the server indicates success, handle accordingly
      handleSuccess(form, response.data.message);
      // Set the 'showWelcomePhoto' flag to 'true' in localStorage
      setItem("showWelcomePhoto", response.data.success);
      setItem("logged", response.data.success);
    } else {
      // If the server indicates failure, handle accordingly
      handleNotSuccess(response.data);
    }
  } catch (error) {
    handleServerError(form, error);
  } finally {
    // Restore button text
    btn.innerHTML = oldValue;
  }
}
// Function to handle user logout
export async function logoutUser(header) {
  // Send a POST request to the /auth/logout endpoint with the CSRF token in the headers
  const logoutResponse = await axios.post("/auth/logout", {}, header);
  // Check if the logout request is successful
  if (logoutResponse.status === 200 && logoutResponse.data.success) {
    // Redirect the user to the login page
    window.location.href = "/auth/login";
    // Clear localStorage flags
    clearWelcomePhotoFlag();
    clearAuth();
    removeToken();
  } else {
    // If the logout process fails, display an error message
    const message = logoutResponse.data.message;
    showMessage(msgElm, message, "#944E63");
  }
}

/**
 * Retrieves user information based on the username obtained from the cookie.
 * @returns {Promise<object>} A Promise that resolves to an object containing user information.
 */
export async function getUserInfo() {
  try {
    // Make a GET request to fetch user information
    const header = await getAuthHeaders();
    const response = await axios.get("/user-info", {}, header);
    // Return user information
    return response.data.data;
  } catch (error) {
    // Handle errors
    showMessage(
      msgElm,
      "Failed to fetch user data. Please try again later.",
      "#FF6347"
    );
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
}

// Function to fetch tweets from the API
export async function getTweets() {
  try {
    const header = await getAuthHeaders();
    // Make asynchronous calls to fetch tweets and user information in parallel
    const [tweetsResponse, userInfo] = await Promise.all([
      axios.get("/api/tweets", {}, header),
      getUserInfo(),
    ]);
    // Check if the request was successful
    if (tweetsResponse.data.success) {
      // Display the fetched tweets
      ShowTweets(tweetsResponse, userInfo);
      // Handle displaying tweets on the UI as needed
      attachIconClickListeners();
    } else {
      // Display error message with error-related color
      showMessage(msgElm, tweetsResponse.data.error, "#ff6347"); // Error color
    }
  } catch (error) {
    // Handle errors
    if (error.response && error.response.data && error.response.data.error) {
      // Display error message returned from the server
      showMessage(msgElm, error.response.data.error, "#ffd700");
    } else {
      // Display a generic error message for other errors
      showMessage(
        msgElm,
        "An unexpected error occurred while creating the tweet. Please try again later.",
        "#cc0000"
      );
    }
  }
}
// Function to create a tweet
export async function tweetCreation(data) {
  // Make asynchronous calls to get the CSRF header and user information in parallel
  const [header, userInfo] = await Promise.all([
    getAuthHeaders(),
    getUserInfo(),
  ]);
  // Send a POST request to create a tweet with the obtained CSRF header
  const response = await axios.post("/api/create", data, header);
  // If tweet creation is successful, add the tweet and log the response
  if (response.data.success) {
    AddTweet(response.data.data, userInfo);
  } else {
    // If tweet creation fails, display error message
    showMessage(msgElm, response.data.error, "ffd700");
  }
}

export async function sendRequestPut(url, data = {}) {
  try {
    // Get authorization headers
    const headers = await getAuthHeaders();
    // Send request with authorization headers
    const response = await axios.put(`/api/${url}`, data, headers);

    return response;
  } catch (error) {
    console.error("Error in sendRequest:", error);
    let errorMessage = "An unexpected error occurred. Please try again.";
    let color = "#ff6347";
    if (error.response) {
      // Server responded with an error status code
      errorMessage = "The server encountered an error. Please try again later.";
      color = "#ff0000"; // Red color for server errors
    } else if (error.request) {
      // Request was made but no response was received
      errorMessage = "No response received from the server. Please try again.";
      color = "#ffa500"; // Orange color for network errors
    } else {
      // Error occurred while setting up the request
      errorMessage = "Error setting up the request. Please try again.";
    }
    showMessage(msgElm, errorMessage, color);
  }
}

/**
 * Toggles the like status of a tweet.
 * @param {string} id - The ID of the tweet to toggle the like status for.
 * @returns {number} - The updated count of likes for the tweet.
 */
export async function toggleLike(id) {
  try {
    // Send request to toggle like status
    const response = await sendRequestPut(`like/${id}`);
    // Check if request was successful
    if (response.data.success) {
      // Save updated token
      saveToken(response.data.data.token);

      // Get updated count of likes
      const countLike = response.data.data.likes.length;
      return countLike;
    } else {
      // Show error message with appropriate color
      showMessage(
        msgElm,
        "Failed to toggle like. Please try again.",
        "#b22222"
      );
    }
  } catch (error) {
    // If an unexpected error occurs, show a general error message
    showMessage(
      msgElm,
      "An unexpected error occurred. Please try again.",
      "#ff6347"
    );
  }
}

export async function toggleRetweet(id) {
  try {
    // Send request to toggle like status
    const headers = await getAuthHeaders();
    const response = await axios.post(`/api/retweet/${id}`, {}, headers);
    console.log("response=>", response);
    if (response.data.success) {
      // Save updated token
      saveToken(response.data.data.token);
      return response.data.data.retweet ;
    }else{
      // Show error message with appropriate color
      showMessage(
        msgElm,
        "Failed to toggle Retweet. Please try again.",
        "#b22222"
      );
    }
  } catch (error) {
    let errorMessage = "An unexpected error occurred. Please try again.";
    let color = "#ff6347";
    if (error.response.data.error) {
      // Server responded with an error status code
      errorMessage = error.response.data.error;
      color = "#ff0000"; // Red color for server errors
    } else if (error.request) {
      // Request was made but no response was received
      errorMessage = "No response received from the server. Please try again.";
      color = "#ffa500"; // Orange color for network errors
    } else {
      // Error occurred while setting up the request
      errorMessage = "Error setting up the request. Please try again.";
    }
    showMessage(msgElm, errorMessage, color);
  }
}
