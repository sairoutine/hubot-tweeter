# Description:
#   Allows users to post a tweet to Twitter
#
#   Requires a Twitter consumer key and secret, which you can get by
#   creating an application here: https://dev.twitter.com/apps
#
# Commands:
#   tw <message> - posts the messages to twitter
#
# Dependencies:
#   "twit": "1.1.8"
#
# Configuration:
#   HUBOT_TWITTER_KEY
#   HUBOT_TWITTER_SECRET
#   HUBOT_TWITTER_TOKEN
#   HUBOT_TWITTER_TOKEN_SECRET
#
# Author:
#   sairoutine
#
# Repository:
#   https://github.com/sairoutine/hubot-tweeter

Twit = require "twit"
config =
  consumer_key: process.env.HUBOT_TWITTER_KEY
  consumer_secret: process.env.HUBOT_TWITTER_SECRET
  access_token: process.env.HUBOT_TWITTER_TOKEN
  access_secret: process.env.HUBOT_TWITTER_TOKEN_SECRET

unless config.consumer_key
  console.log "Please set the HUBOT_TWITTER_CONSUMER_KEY environment variable."
unless config.consumer_secret
  console.log "Please set the HUBOT_TWITTER_CONSUMER_SECRET environment variable."
unless config.access_token
  console.log "Please set the HUBOT_TWITTER_TOKEN environment variable."
unless config.access_secret
  console.log "Please set the HUBOT_TWITTER_TOKEN_SECRET environment variable."


module.exports = (robot) ->
  robot.hear /tw\s(.+)$/i, (msg) ->

    update   = msg.match[1].trim()

    unless update and update.length > 0
      msg.reply "ツイートを入力してください。"
      return

    if update.length > 140
      msg.reply "メッセージが140字以上あるみたいです。"
      return

    twit = new Twit
      consumer_key: config.consumer_key
      consumer_secret: config.consumer_secret
      access_token: config.access_token
      access_token_secret: config.access_secret

    twit.post "statuses/update",
      status: update
    , (err, reply) ->
      if err
        data = JSON.parse(err.data).errors[0]
        msg.reply "投稿できませんでした。 #{data.message} (error #{data.code})"
        return
      if reply['text']
        #return msg.send "#{reply['user']['screen_name']} just tweeted: #{reply['text']}"
        return
      else
        return msg.reply "投稿できませんでした。同じメッセージを投稿してませんか？"
