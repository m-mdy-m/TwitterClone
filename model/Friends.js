const { Schema, model } = require("mongoose");
const FriendsSchema = new Schema(
  {
    friends: [
      {
        type: Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
FriendsSchema.methods.add = async function (userId) {
  // Check if the user is already in the friends list
  if (!this.friends.includes(userId)) {
    // Add the user to the friends list
    this.friends.push(userId);
    // Save the updated friends list
    await this.save();
  }
};
// Define a method to delete a friend from the friends list
FriendsSchema.methods.delete = async function (userId) {
  // Find the index of the user in the friends list
  const index = this.friends.indexOf(userId);
  // Check if the user is in the friends list
  if (index !== -1) {
    // Remove the user from the friends list
    this.friends.splice(index, 1);
    // Save the updated friends list
    await this.save();
  }
};
module.exports = model("Friends", FriendsSchema);
