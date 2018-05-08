var http = require('http');

function handle_incoming_request(req, res) {
    console.log('请求来自:' + req.method + ' ' + req.url);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: null }) + "\n");
}
var s = http.createServer(handle_incoming_request);
s.listen(1919);