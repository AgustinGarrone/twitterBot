
const express = require('express')
const app = express()
require('dotenv').config()
const Twit = require('twit')

var T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret:process.env.access_token_secret
})


var allTweet;

  

function tweetToDto(tweet) {


    if (tweet.in_reply_to_screen_name != null) {
        var res = {
            status: '⚡ Hey, bro check @cryptocupqatar first crypto tournament based in qatar world cup 2022!⚡ #nft #playtoearn #worldcup2022 '  ,
            in_reply_to_status_id: '' + tweet.id_str ,
            in_reply_to_user_id:'' + tweet.user.id,
            in_reply_to_screen_name:''+ tweet.user.screen_name,
            auto_populate_reply_metadata: true
          };

        T.post('statuses/update', res, function(err, data, response) {
            console.log(data)
    })  
    }}  
    
    function loopGetTweets() {
      console.log("ejecutando loopget");
      T.get('search/tweets', { q: '#nft since:2022-07-11', count: 300 },async function(err, data, response) {
        allTweet = data.statuses.map(tweet => tweetToDto(tweet))
        console.log("ejecutando");
      })
      setInterval(() => {
        loopGetTweets()
      }, 1800000);
    }

loopGetTweets()

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("server running"));
