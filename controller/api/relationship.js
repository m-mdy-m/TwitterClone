const User = require('../../model/User');

exports.updateFollowStatus = async (ctx) => {
    const { userId, followUserId } = ctx.body;
    const { success, internalServerError } = ctx.jsonSender();

    try {
        const user = await User.findById(userId.toString());
        const userFollowed = user.followers.includes(followUserId);
        const option = userFollowed ? '$pull' : '$addToSet';

        // Update the follow status
        await User.findByIdAndUpdate(userId, { [option]: { following: followUserId } });
        await User.findByIdAndUpdate(followUserId, { [option]: { followers: userId } });

        // Determine the follow status after the update
        const updatedUser = await User.findById(userId.toString());
        const updatedUserFollowed = updatedUser.followers.includes(followUserId);

        // Respond with success message and follow status
        if (userFollowed) {
            success('Successfully unfollowed user.', { statusFollow: updatedUserFollowed });
        } else {
            success('Successfully followed user.', { statusFollow: updatedUserFollowed });
        }
    } catch (error) {
        internalServerError();
    }
};