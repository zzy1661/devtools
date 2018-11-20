var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
	var location = req.body.file;
	fs.readFile(location,'utf8',(err, data) => {
		if(err) throw err;
		console.log(data);
		res.end(JSON.stringify({
			content: data
		}));
	});
});
router.get('/', function(req, res, next) {
	const io = require('socket.io')(3001, {
		path: '/test',
		serveClient: false,
		// below are engine.IO options
		pingInterval: 10000,
		pingTimeout: 5000,
		cookie: false
	  });
	  io.on('connection',function(socket) {
		socket.emit('news',{hello:'world'});
		socket.on('my other event', function(data) {
		  console.log(data);
		})
	  })
	res.end('111')
});
module.exports = router;