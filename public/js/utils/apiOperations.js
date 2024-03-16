import {AddTweet,ShowTweets,attachIconClickListeners,} from "../tweets/tweetHandlers.js";
import {getCSRFHeader,handleNotSuccess,handleSuccess,showMessage,} from "./helper.js";
import {clearAuth,clearWelcomePhotoFlag,getMsgElement,getUsernameFromCookie,removeUsernameCookie,saveUsernameInCookie,setItem,} from "./utils.js";
const msgElm = getMsgElement();
// Function to Signup or Login user
export async function authenticateUser(url, requestData, header, form) {
  const response = await axios.post(url, requestData, header);
  // Handle server response based on success or failure
  if (response.data.success) {
    const user = response.data.data;
    console.log('user =>',user)
    saveUsernameInCookie(user.username)
    // If the server indicates success, handle accordingly
    handleSuccess(form, response.data.message);
    // Set the 'showWelcomePhoto' flag to 'true' in localStorage
    setItem("showWelcomePhoto", response.data.success);
    setItem("logged", response.data.success);
  } else {
    // If the server indicates failure, handle accordingly
    handleNotSuccess(response.data);
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
    removeUsernameCookie()
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
export async function getUserInfo(){
  try {
    // Get the username from the cookie
    const username = getUsernameFromCookie();
    if(!username){
      showMessage(msgElm,'Username not found in the cookie', '#FF6347')
    }
    // Make a GET request to fetch user information
    const response = await axios.get(`/api/user/${username}`);

    // Extract relevant data from the response
    const { email, likes, profilePic } = response.data.data;

    // Return user information
    return { email, likes, profilePic };
  } catch (error) {
    // Handle errors
    showMessage(msgElm,'Failed to fetch user data. Please try again later.', '#FF6347')
  }
}

// Function to fetch tweets from the API
export async function getTweets() {
  try {
    // Make a GET request to fetch tweets
    const response = await axios.get("/api/tweets");
    // Check if the request was successful
    if (response.data.success) {
      // Display the fetched tweets
      ShowTweets(response);
      // Handle displaying tweets on the UI as needed
      attachIconClickListeners();
    } else {
      // Display error message with error-related color
      showMessage(msgElm, response.data.error, "#ff6347"); // Error color
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
  // Get CSRF header
  const header = await getCSRFHeader();
  // Send POST request to create tweet with CSRF header
  const response = await axios.post("/api/create", data, header);
  // If tweet creation is successful, add the tweet and log the response
  if (response.data.success) {
    AddTweet(response);
  } else {
    // If tweet creation fails, display error message
    showMessage(msgElm, response.data.error, "ffd700");
  }
}
// Function to toggle like on a tweet
export async function toggleLike(id) {
  try {
      const header = await getCSRFHeader();
      const response = await axios.put(`/api/like/${id}`, {}, header);
      console.log("response =>", response);
      const countLike = response.data.data.likes.length;
      return countLike;
  } catch (error) {
      console.log("error =>", error);
  }
}