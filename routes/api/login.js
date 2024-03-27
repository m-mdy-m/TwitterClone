const route = require('xprz').Route()
const Clint = require('../../utils/TwitterApi')

route.route('/auth/twitter').get((req,{redirect})=>{
    const url = Clint.generateOAuth2AuthLink('http://localhost:3000/auth/twitter/callback')
    console.log('url =>',url);
    redirect(url)
})

route.route('/auth/twitter/callback').get((req,res)=>{
    console.log(req.query);
})

module.exports = route