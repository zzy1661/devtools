var express = require('express');
var socketApp = express();
var socketServer = require('http').Server(socketApp);
var io = require('socket.io')(socketServer);
/* io.on('connection', function(socket) {
	socket.on('disconnect', function() {
		console.log('user disconnected');
	});
	socket.on('chat message', function(msg) {
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
	io.emit('some event', { for: 'everyone' });
	socket.broadcast.emit('hi','broadcast');

}); */

socketServer.listen(8080, function() {
	console.log('socket listening on *:8080');
});
module.exports = io;