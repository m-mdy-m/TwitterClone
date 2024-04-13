const Tweet = require("../../model/Tweet");
/**
 * @module userTweetController
 * @description Exports functions for retrieving user-related tweets.
 */

/**
 * @function findUserTweets
 * @description Retrieves a list of tweets authored by the specified user.
 *
 * @param {Object} ctx - The context object from the framework.
 * @param {string} ctx.param("userId") - The ID of the user whose tweets are requested.
 *
 * @returns {Promise} Resolves with an array of tweet objects populated with author details.
 *
 * @throws {Error} - Internal server error if an unexpected error occurs.
 */
exports.findUserTweets = async (ctx) => {
    const { internalServerError } = ctx.jsonSender();
    try {
        const userId = ctx.param('userId');
        const userTweets = await Tweet.find({ author: userId }).sort({ createdAt: -1 }).populate("author"); 
        ctx.json(userTweets);
    } catch (error) {
        internalServerError("Something went wrong. Please try again later.")
    }
}
/**
 * @function findLikedTweets
 * @description Retrieves a list of tweets liked by the specified user.
 *
 * @param {Object} ctx - The context object from the framework.
 * @param {string} ctx.param("userId") - The ID of the user whose liked tweets are requested.
 *
 * @returns {Promise} Resolves with an array of tweet objects.
 *
 * @throws {Error} - Internal server error if an unexpected error occurs.
 */
exports.findLikedTweets = async (ctx) => {
    const { internalServerError } = ctx.jsonSender();
    try {
        const userId = ctx.param('userId');
        const likedTweets = await Tweet.find({ likes: userId });
        ctx.json(likedTweets);
    } catch (error) {
        internalServerError("Something went wrong. Please try again later.")
    }
}
/**
 * @function findRetweetedTweets
 * @description Retrieves a list of tweets retweeted by the specified user.
 *
 * @param {Object} ctx - The context object from the framework.
 * @param {string} ctx.param("userId") - The ID of the user whose retweeted tweets are requested.
 *
 * @returns {Promise} Resolves with an array of tweet objects.
 *
 * @throws {Error} - Internal server error if an unexpected error occurs.
 */
exports.findRetweetedTweets = async (ctx) => {
    const { internalServerError } = ctx.jsonSender();
    try {
        const userId = ctx.param('userId');
        const retweetedTweets = await Tweet.find({ retweeters: userId });
        ctx.json(retweetedTweets);
    } catch (error) {
        internalServerError("Something went wrong. Please try again later.")
    }
}
