import axios from "axios";
import { displayMessage } from "../auth/validation.js";
import { AddTweet, ShowTweets } from "../tweets/tweetHandlers.js";
import getCSRFToken from "./getCSRFToken.js";
import { getCSRFHeader } from "./handlers.js";
const msgElm = document.getElementById("msgElm");
// Function to fetch tweets from the server
export async function fetchTweets() {
  try {
    // Make a GET request to fetch tweets
    const response = await axios.get("/api/tweets");
    // Check if the request was successful
    if (response.data.success) {
      // Display the fetched tweets
      ShowTweets(response);
      // Handle displaying tweets on the UI as needed
    } else {
      // Display error message with error-related color
      displayMessage(msgElm, response.data.error, "#ff6347"); // Error color
    }
  } catch (error) {
    // Handle errors
    if (error.response && error.response.data && error.response.data.error) {
      // Display error message returned from the server
      displayMessage(msgElm, error.response.data.error, "#ffd700");
    } else {
      // Display a generic error message for other errors
      displayMessage(
        msgElm,
        "An unexpected error occurred while creating the tweet. Please try again later.",
        "#cc0000"
      );
    }
  }
}
export async function fetchCreateTweet(data){
  const header = await getCSRFHeader()
  const response = await axios.post('/api/create',data,header)
  if (response.data.success) {
    AddTweet(response);
    console.log("Tweet created:", response);
  } else {
    displayMessage(msgElm, response.data.error, "ffd700");
  }
}
export async function fetchLike(){
  try {
    const header = await getCSRFHeader()
    const response = await axios.put('/api/like',{},header)
    console.log('response',response);
  } catch (error) {
    console.log('error =>',error);
  }
}