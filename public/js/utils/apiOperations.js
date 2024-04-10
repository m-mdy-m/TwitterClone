import { update_status } from "../nav/navigation-handler.js";
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
  showErrorMessage,
  showMessage,
} from "./helper.js";
import {
  clearAuth,
  clearWelcomePhotoFlag,
  extractToken,
  getMsgElement,
  getRefreshToken,
  saveAccessToken,
  setItem,
} from "./utils.js";
const msgElm = getMsgElement();

// Function to Signup or Login user
export async function authenticateUser(
  url,
  requestData,
  header,
  form,
  btn,
  oldValue
) {
  try {
    const response = await axios.post(url, requestData, header);
    // Handle server response based on success or failure
    if (response.data.success) {
      const tokens = response.data.data.tokens;
      extractToken(tokens); // Save token to cookie
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
    // If the error is not related to token expiration, handle it as usual
    handleServerError(form, error);
  } finally {
    // Restore button text
    btn.innerHTML = oldValue;
  }
}
// Function to handle user logout
export async function logoutUser(header) {
  try {
    // Send a POST request to the /auth/logout endpoint with the CSRF token in the headers
    const logoutResponse = await axios.post("/auth/logout", {}, header);

    // Check if the logout request is successful
    if (logoutResponse.status === 200 && logoutResponse.data.success) {
      // Clear any client-side authentication-related data
      clearWelcomePhotoFlag(); // Assuming this function clears any specific flags
      clearAuth(); // Assuming this function clears any other authentication-related data
      // Redirect the user to the login page
      window.location.href = "/auth/login";
    } else if (logoutResponse.status === 401) {
      // If the server indicates unauthorized access, try refreshing the token
      const tokenRefreshed = await refreshToken();
      if (tokenRefreshed) {
        // If token refresh is successful, retry the logout process
        await logoutUser(header);
      } else {
        // If token refresh fails, display an error message
        showMessage(msgElm, "An error occurred during logout.", "#944E63");
      }
    } else {
      // If the logout process fails for other reasons, display an error message
      const message = logoutResponse.data.message;
      showMessage(msgElm, message, "#944E63");
    }
  } catch (error) {
    // Handle any errors that occur during the logout process
    showMessage(msgElm, "An error occurred during logout.", "#944E63");
  }
}

/**
 * Retrieves user information based on the username obtained from the cookie.
 * @returns {Promise<object>} A Promise that resolves to an object containing user information.
 */
export async function getUserInfo(id = "") {
  try {
    // Make a GET request to fetch user information
    const header = await getAuthHeaders();
    const url = id ? `/user-info?id=${id}` : "/user-info";
    let response = await axios.get(url, {}, header);
    // Return user information
    return response.data.data;
  } catch (error) {
    // If the error is due to unauthorized access (status code 401), try refreshing the token
    if (error.response && error.response.status === 401) {
      const tokenRefreshed = await refreshToken();
      if (tokenRefreshed) {
        // If token refresh is successful, retry the getUserInfo function
        return await getUserInfo(id);
      } else {
        // If token refresh fails, display an error message
        showErrorMessage(
          error,
          "Failed to fetch user data. Please try again later."
        );
        return null; // Return null or handle the error as needed
      }
    } else {
      // If the error is not due to unauthorized access, display an error message
      showErrorMessage(
        error,
        "Failed to fetch user data. Please try again later."
      );
      return null; // Return null or handle the error as needed
    }
  }
}

export async function getTweetInfo(id) {
  try {
    const header = await getAuthHeaders();
    const response = await axios.get(`/tweet-info/${id}`, {}, header);
    return response.data.data;
  } catch (error) {
    showErrorMessage(error);
  }
}
// Function to fetch tweets from the API
export async function getTweets() {
  try {
    const header = await getAuthHeaders();
    // Make asynchronous calls to fetch tweets and user information in parallel
    const tweetsResponse = await axios.get("/api/tweets", { headers: header });

    // Check if the request was successful
    if (tweetsResponse.data.success) {
      const userInfo = await getUserInfo();
      const tweets = tweetsResponse.data.tweets;
      const parentTweets = [];
      for (const tweet of tweets) {
        if (tweet.originalTweet) {
          parentTweets.push(tweet.originalTweet);
        }
      }
      let user;
      if (parentTweets) {
        const authorIds = await Promise.all(
          parentTweets.map(async (parentTweet) => {
            const parentTweetInfo = await getTweetInfo(parentTweet);
            if (!parentTweetInfo) {
              for (const tweet of tweets) {
                if (tweet.originalTweet === parentTweet) {
                  return "Deleted";
                }
              }
            }
            return parentTweetInfo.author;
          })
        );
        const authors = await Promise.all(
          authorIds.map(async (authorId) => {
            if (authorId === "Deleted") {
              return "Deleted";
            }
            return await getUserInfo(authorId?._id);
          })
        );
        authors.forEach((author) => {
          user = author;
        });
      }
      ShowTweets(tweetsResponse, userInfo, user);
      // Handle displaying tweets on the UI as needed
      attachIconClickListeners();
    } else {
      // Display error message with error-related color
      showMessage(msgElm, tweetsResponse.data.error, "#ff6347"); // Error color
    }
  } catch (error) {
    showErrorMessage(
      error,
      "An unexpected error occurred while creating the tweet. Please try again later."
    );
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
    await update_status();
    extractToken(response.data.data.tokens);
    AddTweet(response.data.data.tweet, userInfo);
  } else {
    // If tweet creation fails, display error message
    showMessage(msgElm, response.data.error, "ffd700");
  }
}

export async function sendRequest(url, request = "put", data = {}) {
  let headers = await getAuthHeaders();
  try {
    // Get authorization headers

    // Send request with authorization headers
    const response = await axios[request](`/api/${url}`, data, headers);

    return response;
  } catch (error) {
    // Check if the error is due to an unauthorized (401) response
    if (error.response && error.response.status === 401) {
      // Attempt to refresh the access token
      const success = await refreshToken();
      if (success) {
        // If token refresh was successful, retry the original request
        headers = await getAuthHeaders(); // Get updated authorization headers
        const response = await axios[request](`/api/${url}`, data, headers);
        return response;
      } else {
        // If token refresh failed, handle the error
        showErrorMessage(error);
      }
    } else {
      // Handle other types of errors
      showErrorMessage(error);
    }
  }
}

export async function refreshToken() {
  try {
    // Fetch the refresh token from storage (e.g., from cookies or local storage)
    const refreshToken = getRefreshToken(); // Implement this function to retrieve the refresh token

    // Make a POST request to your server's refresh token endpoint
    const response = await axios.post("/auth/refresh", { refreshToken });

    // Check if the request was successful
    if (response.data.accessToken) {
      const newAccessToken = response.data.accessToken;
      saveAccessToken(newAccessToken); // Save the new access token using your utility function
      return true;
    } else {
      // If the server does not return a new access token, handle the error
      console.error("Failed to refresh access token:", response.data.message);
      return false; // Return false to indicate token refresh failure
    }
  } catch (error) {
    showErrorMessage(error);
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
    const response = await sendRequest(`like/${id}`);
    // Check if request was successful
    if (response.data.success) {
      // Save updated token
      extractToken(response.data.data.tokens);
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
    console.log("error:", error);
    showErrorMessage(error);
  }
}

export async function toggleRetweet(id) {
  try {
    // Send request to toggle like status
    const headers = await getAuthHeaders();
    const response = await axios.post(`/api/retweet/${id}`, {}, headers);
    if (response.data.success) {
      // Save updated token
      extractToken(response.data.data.tokens);
      return response.data.data.retweet;
    } else {
      // Show error message with appropriate color
      showMessage(
        msgElm,
        "Failed to toggle Retweet. Please try again.",
        "#b22222"
      );
    }
  } catch (error) {
    showErrorMessage(error);
  }
}
export async function toggleBookmark(id) {
  try {
    // Send a request to toggle the bookmark status of the tweet with the provided ID
    const response = await sendRequest(`bookmark/${id}`);

    // If the request is successful
    if (response.data.success) {
      // Save the authentication token received from the server's response
      extractToken(response.data.data.tokens);

      // Return the updated bookmark status of the tweet
      return response.data.data.isBookmarked;
    } else {
      // Show error message with appropriate color
      showMessage(
        msgElm,
        "Failed to toggle bookmark status. Please try again later.",
        "#FF5733"
      );
    }
  } catch (error) {
    // Display an error message if an error occurs during the request
    showErrorMessage(error);
  }
}

export async function toggleDeleteTweet(id) {
  try {
    // Retrieve authentication headers
    const headers = await getAuthHeaders();

    // Send a DELETE request to the server to delete the tweet with the provided ID
    const response = await axios.delete(`/api/deleteTweet/${id}`, headers);
    if (response.data.data) {
      // Save the authentication token received from the server's response
      extractToken(response.data.data.tokens);
    } else if (!response.data.success) {
      // Show error message with appropriate color
      showMessage(
        msgElm,
        "Failed to toggle Delete Tweet status. Please try again later.",
        "#FF5733"
      );
    }

    // Return the ID of the deleted tweet
    return response.data.success;
  } catch (error) {
    // Display an error message if an error occurs during the deletion process
    showErrorMessage(error);
  }
}

export async function toggleEditTweet(id, content) {
  try {
    const response = await sendRequest(`edit/${id}`, "put", { content });
    if (!response) {
      // Show error message with appropriate color
      showMessage(
        msgElm,
        "Failed to toggle Edit Tweet status. Please try again later.",
        "#FF5733"
      );
    }
  } catch (error) {
    showErrorMessage(error);
  }
}

export async function getProfileUser(username) {
  try {
    const response = await sendRequest(`profile/${username}`, "get");
    return response.data;
  } catch (error) {
    showErrorMessage(error);
  }
}

export async function follow_status(userId, followUserId) {
  try {
    const response = await sendRequest("follow-status", "put", {
      userId,
      followUserId,
    });
    // If the request is successful
    if (response.data.success) {
      // Save the authentication token received from the server's response
      extractToken(response.data.data.tokens);

      // Return the updated bookmark status of the tweet
      return response.data.data.statusFollow;
    } else {
      // Show error message with appropriate color
      showMessage(
        msgElm,
        "Failed to toggle bookmark status. Please try again later.",
        "#FF5733"
      );
    }
  } catch (error) {
    showErrorMessage(error);
  }
}

export async function findUserTweets(userId) {
  try {
    const response = await sendRequest(`user/posts/${userId}`, "get");
    return response.data;
  } catch (error) {
    showErrorMessage(error);
  }
}
export async function findLikedTweets(userId) {
  try {
    const response = await sendRequest(`user/likes/${userId}`, "get");
    return response.data;
  } catch (error) {
    showErrorMessage(error);
  }
}
export async function findRetweetedTweets(userId) {
  try {
    const response = await sendRequest(`user/retweets/${userId}`, "get");
    return response.data;
  } catch (error) {
    showErrorMessage(error);
  }
}

export async function add_friend(userId) {
  try {
    const response = await sendRequest(`add_friend/${userId}`, "post");
  } catch (error) {
    showErrorMessage(error);
  }
}
export async function del_friend(userId) {
  try {
    const response = await sendRequest(`remove_friend/${userId}`, "delete");
  } catch (error) {
    showErrorMessage(error);
  }
}
export async function updateUserInformation(username, email, bio, userId) {
  try {
    const header = await getAuthHeaders();
    const url = `/user-info?username=${username}&email=${email}&bio=${bio}&userId=${userId}`;
    let response = await axios.put(url, {}, header);
    return response.data.success;
  } catch (error) {
    // If the error is not due to unauthorized access, display an error message
    showErrorMessage(
      error.response.data.validationErrors?.errors || error,
      error.response.data.error,
      true
    );
    return null;
  }
}
export async function checkPasswordValue(password,userId) {
  try {
    const header = await getAuthHeaders();
    let response = await axios.get(`/password-check/${password}?id=${userId}`, {}, header);
    return response.data.success
  } catch (error) {
    showErrorMessage(error);
  }
}
export async function changePassword(password,userId){
  try {
    const header = await getAuthHeaders();
    let response = await axios.post(`/changepassowrd/${userId}`, {password}, header);
    return response.data.success
  } catch (error) {
    showErrorMessage(error);
  }
}