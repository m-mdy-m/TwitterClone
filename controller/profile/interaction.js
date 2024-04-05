const Tweet= require("../../model/Tweet")
const User = require('../../model/User')
const TweetUserManager = require("../../utils/helper")

exports.find= async (ctx)=>{
    const {  internalServerError } = ctx.jsonSender()
    try {
        const userId = ctx.param('userId')
        const user = await User.findById(userId)
        console.log('user:',user);
    } catch (error) {
        internalServerError("Something went wrong. Please try again later.")
    }
}