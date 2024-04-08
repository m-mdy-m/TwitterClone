const { Schema, model } = require("mongoose");
const UserSchema = new Schema(
  {
    friends:[
        {
            type:Schema.ObjectId,
            ref:"User",
        }
    ]
  },
  { timestamps: true }
);
module.exports = model("Friends", UserSchema);