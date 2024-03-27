const generateAuthToken = require("./generateAuthToken");

const Tweet = $read("model/Tweet");
const User = $read("model/User");
class TweetUserManager {
  constructor(req, getJsonHandler) {
    this.req = req;
    this.id = this.req.param("id");
    this.json = getJsonHandler();
    this.badRequest = this.json.badRequest;
    this.notFound = this.json.notFound;
    this.internalServerError = this.json.internalServerError;
    this.authRequired = this.json.authRequired;
    this.user = this.req.user;
  }
  async findTweetAndCurrentUser() {
    // Find tweet and tweet ID
    const { tweet, tweetId } = await this.findTweetParam();

    // Find current user
    const { user } = await this.findCurrentUser();

    // Return the found tweet and current user
    return { tweet, user, tweetId };
  }
  async findTweetParam() {
    try {
      const tweetId = this.id;

      // Check if the tweet ID is missing or invalid
      if (!tweetId) {
        return this.badRequest(
          "Invalid request. Please provide a valid tweet ID."
        );
      }

      // Find the tweet by ID
      const tweet = await Tweet.findById(tweetId);
      // If the tweet is not found, return appropriate error message
      if (!tweet) {
        return this.notFound("Tweet not found.");
      }

      // Return the found tweet and its ID
      return { tweet, tweetId };
    } catch (error) {
      // Handle internal server errors
      console.error("Error in findTweet function:", error);
      return this.internalServerError(
        "Internal server error. Please try again later."
      );
    }
  }
  registerUser() {
    try {
      // Check if the user is authenticated
      if (!this.user) {
        // Return an authentication required error with a clear message
        return this.authRequired(
          "Authentication required. Please log in to perform this action."
        );
      }

      // Return the registered user object
      return this.user;
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error in registerUser function:", error);
      return this.internalServerError(
        "Internal server error. Please try again later."
      );
    }
  }
  async findCurrentUser() {
    try {
      const userId = this.registerUser().userId;

      // Find the user by their ID
      const user = await User.findById(userId);

      // Check if the user exists
      if (!user) {
        return this.notFound("User not found.");
      }

      // Return the found user
      return { user, userId };
    } catch (error) {
      // Log any unexpected errors
      console.error("Error in findUser function:", error);
      // Return a generic internal server error message
      return this.internalServerError(
        "Internal server error. Please try again later."
      );
    }
  }

  /**
   * Saves the user session and generates an authentication token.
   * @param {Object} user - The user object to save.
   * @returns {string|null} The authentication token if successful, null if an error occurs.
   */
  saveUser(user) {
    try {
      if (!user || typeof user !== "object") {
        return this.badRequest("Invalid user object provided.");
      }

      const token = generateAuthToken(user);
      if (!token || typeof token !== "string") {
        return this.internalServerError(
          "Failed to generate authentication token."
        );
      }

      this.req.session = token;
      return token;
    } catch (error) {
      console.error("Error in saveUser:", error.message);
      return this.internalServerError(
        "Internal server error. Please try again later."
      );
    }
  }
}
module.exports = TweetUserManager;
