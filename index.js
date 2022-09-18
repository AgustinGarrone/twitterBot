
const express = require('express')
const app = express()
require('dotenv').config()
const Twit = require('twit')


  //T1 is @pablochillNFT
var T1 = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret:process.env.access_token_secret
})

  //T2 is @poloNFTcrypto
var T2 = new Twit({
  consumer_key: process.env.consumer_key2,
  consumer_secret: process.env.consumer_secret2,
  access_token: process.env.access_token2,
  access_token_secret:process.env.access_token_secret2
})


var allTweet1;
var allTweet2;

var hashtags = ["#CryptoNews" , "#bscgem" , "#nft","#FWC", "#NFTCommuntiy" , "#NFTcommunity" , "#sorare"]
  //emojis distintos para evitar status==
var emojis = ["✔" , "✨" , "🏆" ,"⚽" , "🎉" , "🙌" , "🎁" ,"⚡"]
var counter = 0;

var monthCount = 7;
var dayCount = 0 ;

    function tweetFromAccountOne(tweet) {
      if (tweet.in_reply_to_screen_name != null) {
          let res = {
              status: `${emojis[getRandomInt(0,7)]} Hey, bro check @cryptocupqatar first crypto tournament based in qatar world cup 2022!${emojis[getRandomInt(0,7)]}  #worldcup2022 #p2e` ,
              in_reply_to_status_id: '' + tweet.id_str ,
              in_reply_to_user_id:'' + tweet.user.id,
              in_reply_to_screen_name:''+ tweet.user.screen_name,
              auto_populate_reply_metadata: true
            };
          T1.post('statuses/update', res, function(err, data, response) {
              if (err) console.log(err)
          })  
        }
    }   

    function tweetFromAccountTwo(tweet) {
      if (tweet.in_reply_to_screen_name != null) {
          let res = {
              status: `${emojis[getRandomInt(0,7)]} Hey! check @cryptocupqatar first crypto tournament based in qatar world cup 2022!${emojis[getRandomInt(0,7)]} www.cryptocupqatar.io` ,
              in_reply_to_status_id: '' + tweet.id_str ,
              in_reply_to_user_id:'' + tweet.user.id,
              in_reply_to_screen_name:''+ tweet.user.screen_name,
              auto_populate_reply_metadata: true
            };
          T2.post('statuses/update', res, function(err, data, response) {
              if (err) console.log(err)
              console.log("response es : "+response)
          })  
        }
    }   
    
    function loopGetTweets() {
      console.log("ejecutando loopget");
      T1.get('search/tweets', { q: `${hashtags[counter]}`, count: 300 },async function(err, data, response) {
        allTweet1 = data.statuses.map(tweet => tweetFromAccountOne(tweet))
      })

      T2.get('search/tweets', { q: `${hashtags[counter+1]} `, count: 300 },async function(err, data, response) {
        allTweet2 = data.statuses.map(tweet => tweetFromAccountTwo(tweet))
      })
      counter = counter++
      if (counter + 1 >=6) {
        counter=0;
      }
      setTimeout(() => {
        loopGetTweets()
      }, 1800000);
       
    }

  loopGetTweets()  
   
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  console.log(getRandomInt(0,6))
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("server running"));
