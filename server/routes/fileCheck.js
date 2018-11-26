var express = require('express');
var fs = require('fs');
var router = express.Router();


router.post('/', function(req, res, next) {
	var location = req.body.file;

	//读取文件，返回文本内容
	fs.readFile(location,'utf8',(err, data) => {
		if(err) throw err;
		res.end(JSON.stringify({
			content: data
		}));
	});
	//建立websocket 通道
	
	//观察文件，发送信息
	var watcher = fs.watch(location);
	watcher.on('change',function(e,file) {
		console.log(file);
	})


});

module.exports = router;