// listen on port so now.sh likes it
const { createServer } = require('http')

// bot features
// due to the Twitter ToS automation of likes
// is no longer allowed, so:
const Twit = require('twit')
const config = require('./config')
const consoleLol = require('console.lol')

const bot = new Twit(config.twitterKeys)

const checkPredictions = require('./api/checkPredictions')
const reply = require('./api/reply')

console.rofl('Bot starting...')

// retweet on keywords
checkPredictions();
setInterval(checkPredictions, config.twitterConfig.check_rate)

// reply to new follower
// commented because no user stream anymore
const userStream = bot.stream('statuses/filter', { track: '@predictionrobot predict' })
userStream.on('tweet', reply)

// This will allow the bot to run on now.sh
const server = createServer((req, res) => {
  res.writeHead(302, {
    Location: `https://twitter.com/${config.twitterConfig.username}`
  })
  res.end()
})

server.listen(3000)
