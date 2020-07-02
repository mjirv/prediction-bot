const Twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')
const isReply = require('../helpers/isReply')
const tweetNow = require('../helpers/tweetNow')

const param = config.twitterConfig
const queryString = unique(param.queryString.split(','))

const bot = new Twit(config.twitterKeys)

const retweet = () => {
  const query = queryString()

  bot.get(
    'statuses/user_timeline',
    {
      screen_name: 'predictionrobot',
      trim_user: true
    },
    (err, data, response) => {
      if (err) {
        console.lol('ERRORDERP: Cannot Search Tweet!, Description here: ', err)
      } else {
        // grab random tweet ID to retweet - desired range for random number is [0..data.statuses.length-1]
        // const rando = Math.floor(Math.random() * data.statuses.length)
        // let retweetId

        // if (!isReply(data.statuses[rando])) {
        //   retweetId = data.statuses[rando].id_str
        // }

        if (typeof(data) !== 'undefined') {
          for (let i in data) {
            tweet = data[i];
            console.lol(tweet.text);
            predictDate =  new Date(tweet.text.split("prediction on")[1] + "Z");
            let now = new Date();
            let lastRun = new Date(now - param.check_rate);
            if (predictDate <= now && predictDate > lastRun) {
              let replyUser = tweet.in_reply_to_screen_name;
              let text = `Hi @${replyUser}. I am here to remind you about this prediction. Did it come true?`
              let replyId = tweet.id_str;
              tweetNow(text, replyId);
            }
          }
        }
      }
    }
  )
}

module.exports = retweet
