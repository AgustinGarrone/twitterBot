require('dotenv').config()
fs = require('fs');
const express = require('express')
const Twit = require('twit')



const app = express()

  //T1 is twitter Account number One
let T1 = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret:process.env.access_token_secret
})

  //T2 is twitter Account number two
let T2 = new Twit({
  consumer_key: process.env.consumer_key2,
  consumer_secret: process.env.consumer_secret2,
  access_token: process.env.access_token2,
  access_token_secret:process.env.access_token_secret2
})


let allTweet1;
let allTweet2;
  //hashtags you want to filter with
let hashtags = ["#CryptoNews" , "crypto new" , "crypto gem","#bscgem" , "#nft","#playtoearn", "#NFTCommuntiy" , "#fwc" , "#sorare"]
let palabras = ["nft", "play to earn proyect" ,"play to earn", "crypto ", "fifa crypto" ,"p2e", "fwc token"]

  //different emojis to put in the tweet and avoid spam errors
let emojis = ["✔" , "✨" , "🏆" ,"⚽" , "🎉" , "🙌" , "🎁" ,"⚡"]
  //counter to traverse arrays
let counter = 0;
  //image you want the bots tweet
let b64content = fs.readFileSync('./YOURIMAGEPATH.JPG', { encoding: 'base64' })

    function tweetFromAccountOne(tweet) {
      if (tweet.in_reply_to_screen_name != null) {

          T1.post('media/upload', { media_data: b64content }, function (err, data, response) {
            let mediaIdStr = data.media_id_string
            let altText = "YOUR IMAGE DESCRIPTION"
            let meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
           
            T1.post('media/metadata/create', meta_params, function (err, data, response) {
              if (!err) {
                // now we can reference the media and post a tweet (media will attach to the tweet)
                let params = { 
                  status: `${emojis[getRandomInt(0,7)]} WRITE HERE WHAT YOU WANT THE BOT TO TWITE ${emojis[getRandomInt(0,7)]}  #YOURBOTHASHTAG #YOURBOTHASHTAG`,
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
            console.log("twitted");
            })
          })
      }

    }   

    function tweetFromAccountTwo(tweet) {
      if (tweet.in_reply_to_screen_name != null) {
        T2.post('media/upload', { media_data: b64content }, function (err, data, response) {
          let mediaIdStr = data.media_id_string
          let altText = "YOUR IMAGE DESCRIPTION"
          let meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
         
          T2.post('media/metadata/create', meta_params, function (err, data, response) {
            if (!err) {
              // now we can reference the media and post a tweet (media will attach to the tweet)
              let params = { 
                status: `${emojis[getRandomInt(0,7)]} WRITE HERE WHAT YOU WANT THE BOT TO TWITE ${emojis[getRandomInt(0,7)]}  #YOURBOTHASHTAG #YOURBOTHASHTAG`,
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
    
    function loopGetTweets(accounts) {

      if (accounts==1) {
        T1.get('search/tweets', { q: `${hashtags[counter]}`, count: 100 },async function(err, data, response) {
          allTweet1 = data.statuses.map(tweet => tweetFromAccountOne(tweet))
        })
      }
      if (accounts==2) {
        T1.get('search/tweets', { q: `${hashtags[counter]}`, count: 60 },async function(err, data, response) {
          allTweet1 = data.statuses.map(tweet => tweetFromAccountOne(tweet))
        })
        T2.get('search/tweets', { q: `${hashtags[counter+1]} `, count: 60 },async function(err, data, response) {
          allTweet2 = data.statuses.map(tweet => tweetFromAccountTwo(tweet))
        }) 
      }
      counter = counter++
        //when counter is greater than the limit of the array it is reset
      if (counter + 1 >=hashtags.length) {
        counter=0;
      }
      setTimeout(() => {
        loopGetTweets(1)
      }, 1200000);
       
    }

  loopGetTweets(1)   

  //FUNCTION TO GET RANDOM NUMBERS FROM THE ARRAY OF EMOJIS
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("server running"));
