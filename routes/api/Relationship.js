const { expose,group,mids } = require('xprz').Route()
const { following,follower } = $read('controller/api/relationship')
const { verifyToken } = $read('middleware/is-auth')
mids([verifyToken])
group('/api',(r)=>{
    r.route('/following').put(following)
    r.route('/follower').put(follower)
})

module.exports = expose