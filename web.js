var http = require('http');
function http_request(req, res) {
    var body = 'welcome to potato';
    var content_length = body.length;
    res.writeHead(200, {
        'content-length': content_length,
        'Content-Type': 'text-plan'
    });
    res.end(body);
}
var t = http.createServer(http_request);
t.listen(1919);