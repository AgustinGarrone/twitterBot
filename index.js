
const express = require('express')
const app = express()
require('dotenv').config()
fs = require('fs');
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
  //hashtags para filtrar tweets
var hashtags = ["#CryptoNews" , "crypto new" , "crypto gem","#bscgem" , "#nft","#playtoearn", "#NFTCommuntiy" , "#fwc" , "#sorare"]
var palabras = ["nft", "play to earn proyect" ,"play to earn", "crypto ", "fifa crypto" ,"p2e", "fwc token"]
  //emojis distintos para evitar status==
var emojis = ["✔" , "✨" , "🏆" ,"⚽" , "🎉" , "🙌" , "🎁" ,"⚡"]
  //counter para recorrer arreglos 
var counter = 0;

var b64content = fs.readFileSync('./Captura.JPG', { encoding: 'base64' })

    function tweetFromAccountOne(tweet) {
      if (tweet.in_reply_to_screen_name != null) {

          T1.post('media/upload', { media_data: b64content }, function (err, data, response) {
            var mediaIdStr = data.media_id_string
            var altText = "crypto tournament based in qatar world cup 2022."
            var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
           
            T1.post('media/metadata/create', meta_params, function (err, data, response) {
              if (!err) {
                // now we can reference the media and post a tweet (media will attach to the tweet)
                var params = { 
                  status: `${emojis[getRandomInt(0,7)]} Hey, bro check @cryptocupqatar first crypto tournament based in qatar world cup 2022!${emojis[getRandomInt(0,7)]}  #worldcup2022 #p2e`,
                   media_ids: [mediaIdStr] ,
                   in_reply_to_status_id: '' + tweet.id_str ,
                   in_reply_to_user_id:'' + tweet.user.id,
                   in_reply_to_screen_name:''+ tweet.user.screen_name,
                   auto_populate_reply_metadata: true
                }
           
                T1.post('statuses/update', params, function (err, data, response) {
                  if (err) {
                    console.log(err)
                  }
                })
              }
            })
          })
      }

    }   

    function tweetFromAccountTwo(tweet) {
      if (tweet.in_reply_to_screen_name != null) {
        T2.post('media/upload', { media_data: b64content }, function (err, data, response) {
          var mediaIdStr = data.media_id_string
          var altText = "crypto tournament based in qatar world cup 2022."
          var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
         
          T2.post('media/metadata/create', meta_params, function (err, data, response) {
            if (!err) {
              // now we can reference the media and post a tweet (media will attach to the tweet)
              var params = { 
                status: `${emojis[getRandomInt(0,7)]} Hey, bro check @cryptocupqatar first crypto tournament based in qatar world cup 2022!${emojis[getRandomInt(0,7)]}  #worldcup2022 #p2e`,
                 media_ids: [mediaIdStr] ,
                 in_reply_to_status_id: '' + tweet.id_str ,
                 in_reply_to_user_id:'' + tweet.user.id,
                 in_reply_to_screen_name:''+ tweet.user.screen_name,
                 auto_populate_reply_metadata: true
              }
         
              T2.post('statuses/update', params, function (err, data, response) {
                if (err) {
                  console.log(err)
                }
              })
            }
          })
        })
        }
    }   
    
    function loopGetTweets() {
      console.log("ejecutando loopget");
      T1.get('search/tweets', { q: `${hashtags[counter]}`, count: 150 },async function(err, data, response) {
        allTweet1 = data.statuses.map(tweet => tweetFromAccountOne(tweet))
      })

       T2.get('search/tweets', { q: `${hashtags[counter+1]} `, count: 150 },async function(err, data, response) {
        allTweet2 = data.statuses.map(tweet => tweetFromAccountTwo(tweet))
      }) 
      counter = counter++
        //cuando counter es mayor que el limite del array se resetea
      if (counter + 1 >=hashtags.length) {
        counter=0;
      }
      setTimeout(() => {
        loopGetTweets()
      }, 1200000);
       
    }

  loopGetTweets()   
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("server running"));
