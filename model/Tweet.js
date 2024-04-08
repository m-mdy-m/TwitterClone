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
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);
tweetSchema.methods.incrementViews = async function (userId) {
  // Check if the user has already viewed this tweet
  if (!this.viewedBy.some((s) => s.user && s.user.equals(userId))) {
    // If not, increment the view count and add the user to the viewedBy array
    this.viewedBy.push({ user: userId });
    await this.save();
  }
};
module.exports = model("Tweet", tweetSchema);
