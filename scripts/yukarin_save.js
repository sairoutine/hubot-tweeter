/* ゆかりんのセリフを保存する */
//'use strict';
module.exports = function (robot) {


	robot.hear(/^yukarin\s+(.+)$/i, function(msg) {

		var serif = msg.match[1].trim();

		if(serif === undefined || serif.length === 0)
		{
			msg.reply("内容がないぜ");
			return;
		}

		if(serif.length > 140)
		{
			msg.reply('セリフは140文字までだぜ');
			return;
		}

		/* MYSQLへの接続を確立 */
		var mysql = require('mysql').createConnection({
			host     : 'localhost',
			user     : 'root',
			password : '',
			database : 'yukarin'
		});
		mysql.connect();

		var query = mysql.query('INSERT INTO serif SET body = ?', serif);

		query.on('error', function(err) {
			console.log('yukarin serif err is: ', err);
		})
		.on('result', function(rows) {

		})
		.on('end', function() {
			mysql.destroy();
			msg.send('セリフを保存していおいたぜ');
		});

		return;
	});
};
