import {
  AddTweet,
  ShowTweets,
  attachIconClickListeners,
} from "../tweets/tweetHandlers.js";
import {
  getAuthHeaders,
  handleNotSuccess,
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
export async function authenticateUser(url, requestData, header, form) {
  const response = await axios.post(url, requestData, header);
  console.log('response=>',response);
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
}
// Function to handle user logout
export async function logoutUser(header) {
  // Send a POST request to the /auth/logout endpoint with the CSRF token in the headers
  const logoutResponse = await axios.post("/auth/logout", {}, header);
  console.log("logoutResponse =>", logoutResponse);
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
    const header = await getAuthHeaders()
    console.log('header=>',header);
    const response = await axios.get('/user-info',{},header);
    console.log('response=>',response);
    // Extract relevant data from the response
    const { email, likes, profilePic,username } = response.data.data;

    // Return user information
    return { email, likes, profilePic, username };
  } catch (error) {
    console.log('error =>',error);
    // Handle errors
    showMessage(
      msgElm,
      "Failed to fetch user data. Please try again later.",
      "#FF6347"
    );
  }
}

// Function to fetch tweets from the API
export async function getTweets() {
  try {
    const header = await getAuthHeaders()
    // Make asynchronous calls to fetch tweets and user information in parallel
    const [tweetsResponse, userInfo] = await Promise.all([
      axios.get("/api/tweets",{},header),
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
    AddTweet(response, userInfo);
  } else {
    // If tweet creation fails, display error message
    showMessage(msgElm, response.data.error, "ffd700");
  }
}
// Function to toggle like on a tweet
export async function toggleLike(id) {
  try {
    const header = await getAuthHeaders();
    const response = await axios.put(`/api/like/${id}`, {}, header);
    console.log("response =>", response);
    const countLike = response.data.data.likes.length;
    return countLike;
  } catch (error) {
    console.log("error =>", error);
  }
}
