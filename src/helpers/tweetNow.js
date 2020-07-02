const Twit = require('twit')
const config = require('../config')

const bot = new Twit(config.twitterKeys)

// function: tweets back to user who followed
const tweetNow = (text, replyId) => {
  let tweet = {
    status: text,
    in_reply_to_status_id: replyId,
    auto_populate_reply_metadata: true
  }

  bot.post('statuses/update', tweet, (err, data, response) => {
    if (err) {
      console.lol('ERRORDERP Reply', err)
    }
    console.lol('SUCCESS: Replied: ', text)
  })
}

module.exports = tweetNow
