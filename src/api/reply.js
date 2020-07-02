const Twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')

const param = config.twitterConfig
const randomReply = unique(param.randomReply.split('|'))

const bot = new Twit(config.twitterKeys)

// function: tweets back to user who followed
function tweetNow(text, replyId) {
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

// function: replies to user who followed
const reply = event => {
  // get user's twitter handler/screen name
  console.lol(event);
  let screenName = event.user.screen_name
  let eventId = event.id_str

  if (screenName === config.twitterConfig.username) {
    return
  }
  const response = randomReply()

  const res = response.replace('${screenName}', screenName)

  tweetNow(res, eventId)
}

module.exports = reply
