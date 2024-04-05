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
        const user = await User.findById(userId.toString());
        const userFollowed = user.followers.includes(followUserId);
        const option = userFollowed ? '$pull' : '$addToSet';

        // Update the follow status
        await User.findByIdAndUpdate(userId, { [option]: { following: followUserId } });
        await User.findByIdAndUpdate(followUserId, { [option]: { followers: userId } });

        // Determine the follow status after the update
        const updatedUser = await User.findById(userId.toString());
        const updatedUserFollowed = updatedUser.followers.includes(followUserId);
        // Save user and generate tokens
        const tokens = await userManager.saveUser(updatedUser);
        // Respond with success message and follow status
         console.log('updatedUser:',updatedUser)
        if (userFollowed) {
            success('Successfully unfollowed user.', { statusFollow: updatedUserFollowed,tokens:tokens   });
        } else {
            success('Successfully followed user.', { statusFollow: updatedUserFollowed,tokens: tokens  });
        }
    } catch (error) {
      console.log('error:',error)
        internalServerError();
    }
};