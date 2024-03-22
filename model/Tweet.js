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
    pinned: {
      type: Boolean,
      default: false, // Default value added
    },
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
  },
  { timestamps: true }
);
module.exports = model("Tweet", TweetSchema );
