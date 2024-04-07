const { Schema, model } = require("mongoose");

const tweetSchema = new Schema(
  {
    content: {
      type: String,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    pinned: Boolean,
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    retweeters: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    retweets: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
    originalTweet: {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
    edited: {
      type: Boolean,
      default: false,
    },
    viewedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    views: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);
tweetSchema.methods.incrementViews = async function (userId) {
  // Check if the user has already viewed this tweet
  if (!this.viewedBy.includes(userId)) {
    // If not, increment the view count and add the user to the viewedBy array
    this.views += 1;
    this.viewedBy.push(userId);
    await this.save();
  }
};
module.exports = model("Tweet", tweetSchema);
