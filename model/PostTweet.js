const { Schema, model } = require("mongoose");
const PostTweet = new Schema(
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
    retweetUser: [
      {
        type: Schema.ObjectId,
        ref: "User",
      },
    ],
    retweetData: {
      type: Schema.ObjectId,
    },
  },
  { timestamps: true }
);
module.exports = model("Tweet", PostTweet);
