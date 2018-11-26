var express = require('express');
var randomUid = require('uuid/v4');
var fs = require('fs');
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
		socket.on('chat message', function (msg) {
			console.log('message: ' + msg);
			wsChanel.emit('chat message', msg);
		});
		//观察文件，发送信息
		fileWatch(location, socket);
	});
});

function fileWatch(location, socket) {
	var fw = fs.watch(location);
	var count = 1; //解决window下watch出发两次的bug
	fw.on('change', function (e, f) {
		if (count % 2 === 0) {
			count = 1;
			fs.readFile(location, 'utf8', (err, data) => {
				if (err) throw err;
				socket.emit('chat message', {content: data});
			});
		} else {
			count++;
		}
	})
}


module.exports = router;