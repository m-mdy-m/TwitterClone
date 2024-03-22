const { Schema, model } = require("mongoose");
const TweetSchema  = new Schema(
  {
    content: {
      type: String,
      trim: true,
    },
    postedBy: {
      type: Schema.ObjectId,
      ref: "User",
    },
    pinned: Boolean,
    likes: [
      {
        type: Schema.ObjectId,
        ref: "User",
      },
    ],
    retweeters: [
      {
        type: Schema.ObjectId,
        ref: "User",
      },
    ],
    originalTweet: {
      type: Schema.ObjectId,
      ref: "Tweet",
    },
  },
  { timestamps: true }
);
module.exports = model("Tweet", TweetSchema );
