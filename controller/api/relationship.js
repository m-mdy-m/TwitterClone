const User = require('../../model/User');
const TweetUserManager = require('../../utils/helper')
exports.updateFollowStatus = async (ctx) => {
    const { userId, followUserId } = ctx.body;
    const { success, internalServerError } = ctx.jsonSender();
    
    try {
        // Initialize TweetUserManager with context and jsonSender
        const userManager = new TweetUserManager(ctx, ctx.jsonSender);

        // Register the user (assuming registerUser() handles user registration)
        await userManager.registerUser();

        // Retrieve the current user information
        const user = await User.findById(followUserId);
        const userFollowed = user.followers.includes(userId);
        const option = userFollowed ? '$pull' : '$addToSet';

        // Update the follow status
        const updatedUser = await User.findByIdAndUpdate(userId, { [option]: { following: followUserId } },{new : true});
        await User.findByIdAndUpdate(followUserId, { [option]: { followers: userId } },{new : true});
        // Save user and generate tokens
        const tokens = await userManager.saveUser(updatedUser);
        // Respond with success message and follow status
        success('Successfully unfollowed user.', { statusFollow: !userFollowed,tokens:tokens   });
    } catch (error) {
      console.log('error:',error)
        internalServerError();
    }
};