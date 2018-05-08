var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.end('hello potato');
})
app.listen(1919);