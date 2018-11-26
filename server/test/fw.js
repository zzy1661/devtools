var fs = require('fs');
var location = 'G:/fw.txt';
var fw = fs.watch(location);
var count = 1; //解决window下watch出发两次的bug
fw.on('change', function (e, f) {
    if (count % 2 === 0) {
        console.log(f);
        count = 1;
        fs.readFile(location,'utf8',(err, data) => {
            if(err) throw err;
            console.log(data)
        });
    } else {
        count++;
    }
})