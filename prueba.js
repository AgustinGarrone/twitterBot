const Twit = require('twit')
require('dotenv')
var T = new Twit({
    consumer_key: "6pmsBZbMsLe7eyzWhSAppYJ3n",
    consumer_secret: "aqHJWPyGWsMnR8q7LyseQKq5nD1fuv0ISU9nc7sREx8a1b9NPY",
    access_token: "1570738607069057024-CkO9oHBAwwp7u7ffT5WvLAu2aqsPaP",
    access_token_secret:"UmltuIkGc1jdNbYCc9VpZnXqyNzfabaFhqbdynxiQqqQH"
  })

  var allTweet
  T.get('search/tweets', { q: '#playtoearn since:2022-07-11', count: 2 },async function(err, data, response) {
    allTweet = data.statuses.map(tweet => tweetToDto(tweet))
  })

  function tweetToDto(tweet) {
    if (tweet.in_reply_to_screen_name != null) uploaded(tweet);
  }

 /*  const tweetEvent = (tweet) => {
    var b64content = fs.readFileSync("twitt/img.png", {
      encoding: "base64",
    });
  
    T.post(
      "media/upload",
      {
        media_data: b64content,
      },
      uploaded
    ); */
  
    function uploaded(tweet,err, data, response) {
      var params = {
        status: "hi",
        in_reply_to_status_id: tweet.id_str
      };
      //! Post tweet
      T.post("statuses/update", params, tweeted);
    }
  
    function tweeted(err, reply) {
      if (err) {
        console.log(err);
        console.log();
        console.log("Error.");
      } else {
        console.log(reply);
        console.log("tweeted");
      }
    }
  
  
  console.log(allTweet)
 /* */