const Tweet = require("../../model/Tweet");

exports.findUserTweets = async (ctx) => {
    const { internalServerError } = ctx.jsonSender();
    try {
        const userId = ctx.param('userId');
        const userTweets = await Tweet.find({ author: userId }).sort({ createdAt: -1 })
        const result = await Tweet.populate(userTweets, { path: "author" });
        ctx.json(result);
    } catch (error) {
        internalServerError("Something went wrong. Please try again later.")
    }
}

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
