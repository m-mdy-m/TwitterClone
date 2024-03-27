const route = require('xprz').Route()
const Clint = require('../../utils/TwitterApi')

route.route('/api/auth/twitter').get(async(req,{redirect})=>{
    const authLink  = await Clint.generateAuthLink('/auth/twitter',)
    console.log("authLink  =>", authLink);
})

route.route('/auth/twitter').get(async(req,res)=>{
    console.log('hi');
    res.send('auth is work')
})

module.exports = route