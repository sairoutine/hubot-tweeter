/*
# Description:
#  Twitter Watcher
#
# Commands:
#
# Author:
#  sairoutine
*/

var Twitter = require('twit');
var CronJob = require('cron').CronJob;

var BRAIN_KEY = "twitter_stream_last_id";

var _ = require('underscore');

var T = new Twitter({
  "consumer_key" : process.env.HUBOT_TWITTER_KEY,
  "consumer_secret" : process.env.HUBOT_TWITTER_SECRET,
  "access_token" : process.env.HUBOT_TWITTER_TOKEN_3,
  "access_token_secret" : process.env.HUBOT_TWITTER_TOKEN_SECRET_3
});

module.exports = function(robot) {
	new CronJob({
		cronTime: '*/10 * * * *',
		onTick: function(){
			var last_id = robot.brain.get(BRAIN_KEY);

			if(!last_id){ last_id = 626244578362789888; }

			T.get('statuses/home_timeline', {
			  since_id: last_id,
			  lang:"ja"
			}, function(err, tweets, respond){
				if(err){ throw err; }

				var new_last_id = last_id;

				_.each(tweets.reverse(), function(tweet) {
					if(tweet.id > last_id){
						new_last_id = tweet.id;

						/* リツイートは表示しない */
						if( ! tweet.text.match(/^RT/)){
							robot.send(
								{room: "#timeline"},
								"https://twitter.com/" + tweet.user.id_str + "/status/" + tweet.id_str
							);
						}
						else{
							//console.log("retweet: https://twitter.com/" + tweet.user.id_str + "/status/" + tweet.id_str);

						}
					}
				});

				robot.brain.set(BRAIN_KEY, new_last_id);
			},
			null, true, "Asia/Tokyo");
		},
		start: true,
		timeZone: "Asia/Tokyo"
	});
};
