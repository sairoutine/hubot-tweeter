# Description:
#   create github issue
#
# Commands:
#  issue your_issue
#
# Author:
#   @sairoutine

repo  = process.env.HUBOT_GITHUB_ISSUE_REPO or "sairoutine/TODO"

module.exports = (robot) ->
  github = require('githubot')(robot)

  ## list issue
  robot.hear /^issue$/i, (msg) ->
    github.get "https://api.github.com/repos/#{repo}/issues", {}, (issues) ->

      if (!issues.length)
        msg.send "やることがなーんもないぜ"
        return

      issues = issues.sort (a,b) -> a.number > b.number
      texts = []
      for i in issues
        texts.push "[#{i.number}] #{i.title}"
      msg.send texts.join '\n'

  ## create issue
  robot.hear /^issue (.+)$/mi, (msg) ->
    who = msg.message.user.name
    body = msg.match[1]
    query_param =
      title: body
      body: "#{body}"
      labels: ["fromHubot"]
    github.post "https://api.github.com/repos/#{repo}/issues", query_param, (issue) ->
      text = "ToDoに突っ込んどいたぜ"
      msg.send text
