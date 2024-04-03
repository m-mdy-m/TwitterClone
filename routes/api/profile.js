const { verifyToken } = require('../../middleware/is-auth')

const {group, expose} = require('xprz').Route()
const { getProfile } = $read('controller/profile/profile')
group('/api',({route})=>{
    route('/profile/:username').mid(verifyToken).get(getProfile)
})


module.exports=expose