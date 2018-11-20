var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.io.on('connection',function(socket) {
        socket.emit('news',{hello:'world'});
        socket.on('my other event', function(data) {
          console.log(data);
        })
      })
      
});

module.exports = router;
