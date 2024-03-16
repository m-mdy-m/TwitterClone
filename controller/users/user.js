const User = require("../../model/User")

exports.findUserInUsername = async ({param},res)=>{
    const username = param('username')
    const u = await User.findOne({})
}