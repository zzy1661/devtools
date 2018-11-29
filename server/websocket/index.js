var express = require('express');
var socketApp = express();
var socketServer = require('http').Server(socketApp);
var io = require('socket.io')(socketServer);
socketServer.listen(8080, function() {
	console.log('socket listening on *:8080');
});
module.exports = io;