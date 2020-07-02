const Twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')
const tweetNow = require('../helpers/tweetNow')

const param = config.twitterConfig

const bot = new Twit(config.twitterKeys)

// function: replies to user who followed
const reply = event => {
  // get user's twitter handler/screen name
  console.lol(event);
  let screenName = event.user.screen_name
  let eventId = event.id_str
  let predictDate = new Date(event.text.split("predict ")[1] + "Z")

  if (screenName === config.twitterConfig.username) {
    return
  }
  const res = `OK @${screenName}, I will remind you about this prediction on ${predictDate.toUTCString()}.`
  tweetNow(res, eventId)
}

module.exports = reply
