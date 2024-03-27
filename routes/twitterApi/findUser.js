const route = require("xprz").Route();
const {TwitterApi} = require('twitter-api-v2')
// Grouping API routes under the "/api" prefix

const clint = new TwitterApi({
    appKey:'',
    appSecret:'',
    accessSecret:'',
    accessToken:'',
})
route.route('https://api.twitter.com/2/users/by/username/m__mdy__m').get((req,res)=>{
    console.log('res=>',res);
})
module.exports = route;