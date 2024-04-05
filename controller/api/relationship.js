const User = require('../../model/User')
exports.following = async (ctx)=>{
    const { userId,followUserId  } = ctx.body
    const { success, internalServerError } = ctx.jsonSender()

    try {
        await User.findByIdAndUpdate(userId, {$addToSet : {following : followUserId}})
        await User.findByIdAndUpdate(followUserId, { $addToSet: { followers: userId } });
        success('Successfully followed user.')
    } catch (error) {
        internalServerError()
    }
}
exports.follower = async (ctx) => {
    const { userId, followerUserId } = ctx.body;
    const { success, internalServerError } = ctx.jsonSender()
    try {
      // Remove the followerUserId from the following array of the user
      await User.findByIdAndUpdate(userId, { $pull: { following: followerUserId } });
  
      // Remove the userId from the followers array of the user
      await User.findByIdAndUpdate(followerUserId, { $pull: { followers: userId } });
      success('Successfully unfollowed user.')
    } catch (err) {
      internalServerError()
    }
  };