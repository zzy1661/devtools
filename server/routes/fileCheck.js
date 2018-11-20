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

module.exports = router;