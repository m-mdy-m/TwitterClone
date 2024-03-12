import { displayMessage } from "../auth/validation.js";
import getCSRFToken from "../Constants/getCSRFToken.js";
import template from "./TemplateTweet.js";
// Get the message element from the DOM
const msgElm = document.getElementById("msgElm");
const wrapper = document.getElementById("wrapperTweet");
// Function to create a tweet
export async function createTweet(val) {
  // If the tweet data is valid
  if (val.valid) {
    // Hide the error message element
    msgElm.style.opacity = 0;
    msgElm.style.display = "none";
    // Send a POST request to create the tweet
    try {
      // Fetch CSRF token
      const csrfToken = await getCSRFToken();
      if (!csrfToken) {
        msgElm.style.display = "block";
        displayMessage(
          msgElm,
          "Unable to create tweet. CSRF token is missing or invalid.",
          "#ff6347"
        );
        return;
      }
      const data = {
        tweet: val.value,
      };
      const header = {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
      };
      // Send a POST request to create the tweet with CSRF token included in the request body
      const response = await axios.post("/tweets", data, header);
      const dataPost = response.data.data;
      const dataUser = dataPost.postedBy;
      if (response.data.success) {
        console.log("dataUser.username=>", dataUser.username);
        console.log("dataPost.content=>", dataPost.content);
        console.log("dataUser.profilePic=>", dataUser.profilePic);
        // Create the tweet template
        const tweetTemplate = template(
          dataUser.username,
          dataPost.content,
          dataUser.profilePic
        );
        // Create the tweet template
        const tweetTemplateString = template(dataUser.username, dataPost.content, dataUser.profilePic);
        // Append the first child of the container to WrapperPost
        wrapper.innerHTML += tweetTemplateString
      }
      console.log("Tweet created:", response);
    } catch (error) {
      console.log("error =>", error);
      // Handle errors
      if (error.response && error.response.data && error.response.data.error) {
        // Display error message returned from the server
        msgElm.style.display = "block";
        displayMessage(msgElm, error.response.data.error, "#ffd700");
      } else {
        // Display a generic error message for other errors
        msgElm.style.display = "block";
        displayMessage(
          msgElm,
          "An unexpected error occurred while creating the tweet. Please try again later.",
          "#cc0000"
        );
      }
    }
  } else {
    // If the tweet data is invalid, display the error message
    msgElm.style.display = "block";
    displayMessage(msgElm, val.message, "#FF0000");
  }
}
