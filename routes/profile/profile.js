const { verifyToken } = require('../../middleware/is-auth')
const { ProfileUser } = $read('controller/profile/profile')
const {route, expose} = require('xprz').Route()
route(`/profile/:username`).mid(verifyToken).get(ProfileUser)


module.exports=expose