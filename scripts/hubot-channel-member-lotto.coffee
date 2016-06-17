# Description:
#  lotting channel member
#
# Commands:
#   hubot lot-member - lotting active channel member
#
# Author:
#   sairoutine
module.exports = (robot) ->
	robot.respond /lot-member/i, (msg) ->
		slack = robot.adapter.client
		channel_name = msg.message.room

		channel_info = slack.getChannelByName(channel_name);

		users = []
		channel_info.members.forEach (user_id) =>
			users.push slack.users[user_id].name

		chosen_user = msg.random users
		return msg.send chosen_user
