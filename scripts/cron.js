var myname  = "@sairoutine";
var cronJob = require('cron').CronJob;

/* 定期的につぶやく内容一覧 */
var fs = require('fs');
var path = require('path').resolve(__dirname, '../cron_message.json');

var cron_messages = JSON.parse(fs.readFileSync(path, 'utf-8'));
/* ランダムなタイミングでつぶやく内容一覧 */
//var random_messages = require('../random_messages.json');

module.exports = function(robot) {
	cron_messages.forEach(function(mc){
		new cronJob({
			cronTime: mc.time,

			onTick: function() {
				robot.send({room: "#general"}, myname + " " + mc.message);
			},

			start: true,
			timeZone: "Asia/Tokyo"
		});
	});

	/* ランダムなタイミングでつぶやく */
	new cronJob({
		cronTime: "0 30 10-18 * * 1-5",

		onTick: function() {
			if (Math.random() < 0.3){
				robot.send({room: "#general"}, myname + " " + "進捗どうだ？");
			}
		},

		start: true,
		timeZone: "Asia/Tokyo"
	});

};