var fs = require('fs');
var contents;

var rs = fs.createReadStream('simple_stream.js');

re.on('readable', function () {
    var str;
    var d = res.read();
    if (d) {
        if (typeof d == 'string') {
            str = d;
        } else if (typeof d == 'object' && d instanceof Buffer) {
            str = d.toString('utf8');
        }
        if (str) {
            if (!contents) {
                contents = d;
            } else {
                contents += str;
            }
        }
    }
});

rs.on('end', function () {
    console.log('去读文件内容');
    console.log(contents.toString('utf8'));
});