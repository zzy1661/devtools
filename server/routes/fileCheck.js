var express = require('express');
var randomUid = require('uuid/v4');
var fs = require('fs');
var crypto = require('crypto');
var io = require('../websocket');


var router = express.Router();


router.post('/', function (req, res, next) {
	var location = req.body.file;
	//生成uuid作为通道
	var chanelId = randomUid().replace(/-/g, '');
	//读取文件，返回文本内容
	fs.readFile(location, 'utf8', (err, data) => {
		if (err) throw err;
		res.end(JSON.stringify({
			content: data,
			chanelId: chanelId
		}));
	});

	//建立websocket 通道
	var wsChanel = io.of(`/${chanelId}`);
	wsChanel.on('connection', function (socket) {
		socket.on('disconnect', function () {
			console.log('user disconnected');
		});
		//观察文件，发送信息
		fileWatch(location, socket);
	});
});

function fileWatch(location, socket) {
	var fw = fs.watch(location);
	var md5Previous = null;
	var fsWait = false;
	fw.on('change', function (event, filename) {
		if (filename) {
			if (fsWait) return;
			fsWait = setTimeout(() => {
			  fsWait = false;
			}, 100);
			fs.readFile(location, 'utf8', (err, data) => {
				var md5 = crypto.createHash('md5');
				var md5Current = md5.update(data).digest('hex');
				if (md5Current === md5Previous) {
					return;
				}
				md5Previous = md5Current;
				socket.emit('save', {content: data});
				console.log('emit end')
			});
		  }
		
	})
}


module.exports = router;
