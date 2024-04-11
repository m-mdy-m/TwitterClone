const { verifyToken } = require('../../middleware/is-auth')
const { getPage ,getPageUser} = $read('controller/page/page')
const {route,group, expose} = require('xprz').Route()
route(`/page/:username`).mid(verifyToken).get(getPage)
group('/api',(r)=>{
    r.route('/page/:username').get(getPageUser)
})
module.exports=expose