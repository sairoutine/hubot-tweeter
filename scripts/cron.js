var myname  = "@sairoutine";
var cronJob = require('cron').CronJob;

module.exports = function(robot) {
	new cronJob({
		//平日13時
		cronTime: "0 0 13 * * 1-5",

		onTick: function() {
    		robot.send({room: "#general"}, myname + " " + "昼飯の時間だぜ");
		},

		start: true,
		timeZone: "Asia/Tokyo"
	});
};