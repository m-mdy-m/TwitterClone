const { verifyToken } = require('../../middleware/is-auth')

const {group, expose,mids} = require('xprz').Route()
const { find } = $read('controller/profile/interaction')
const { getProfile } = $read('controller/profile/profile')
mids([verifyToken])
group('/api',({route})=>{
    route('/profile/:username').get(getProfile)
    route('/user/interaction/:userId').get(find)
})


module.exports=expose