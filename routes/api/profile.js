const { verifyToken } = require('../../middleware/is-auth')

const {group, expose,mids} = require('xprz').Route()
const { findUserTweets, findLikedTweets,findRetweetedTweets} = $read('controller/profile/interaction')
const { getProfile ,deleteAccount} = $read('controller/profile/profile')
mids([verifyToken])
group('/api',({route})=>{
    route('/profile/:username').get(getProfile)
    route('/user/posts/:userId').get(findUserTweets)
    route('/user/likes/:userId').get(findLikedTweets)
    route('/user/retweets/:userId').get(findRetweetedTweets)
    route('/user/delete/:userId').del(deleteAccount)
})


module.exports=expose