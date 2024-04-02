const {group, expose} = require('xprz').Route()
const { getProfile } = $read('controller/profile/profile')
group('/api',({route})=>{
    route('/profile/:username').get(getProfile)
})


module.exports=expose