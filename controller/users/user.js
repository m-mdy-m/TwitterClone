const User = require("../../model/User")

exports.findUser = async (req,res)=>{
    const username = req.param('username')
    const user = await User.findOne({ username: username })
    console.log('user =>',user);
    if (!user) {
        // If user is not found, send a 404 Not Found response
        return res.status(404).json({ message: "User not found" });
    }
    res.json({message : "hi"})
}