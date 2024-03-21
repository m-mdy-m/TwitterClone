const { Schema, model } = require("mongoose");
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  profilePic: {
    type: String,
    default: "/assets/images/profilePic.png",
  },
  likes:[{
    type : Schema.ObjectId,
    ref : "Tweet",
}],
  retweets:[{
    type : Schema.ObjectId,
    ref : "Tweet",
}],

},{timestamps : true});
module.exports = model("User", UserSchema);
