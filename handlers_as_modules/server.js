var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var album_hdlr = require('./handlers/albums.js');
var page_hdlr = require('./handlers/pages.js');
var helpers = require('./handlers/helpers.js');
//第七章，express的
app.get('/v1/albums.json', album_hdlr.handle_list_album);
app.get('/v1/albums/:album_name.json', album_hdlr.handle_get_album);
app.get('/content/:filename', function (req, res) {
    serve_static_file('content/' + req.params.filename, res);
});
app.get('/v1/albums/:album_name/:filename', function (req, res) {
    serve_static_file('albums/' + req.params.album_name + "/"
        + req.params.filename, res);
});
app.get('/templates/:template_name', function (req, res) {
    serve_static_file('templates/' + req.params.template_name, res);
});
app.get('/v1/pages/:page_name', page_hdlr.generete);
app.get('/v1/pages/:page_name/:sub_page', page_hdlr.generete);
app.get('*', four_oh_four);
function four_oh_four(req, res) {
    helpers.send_failure(res, 404, helpers.invalid_resource());
}
function serve_static_file(file, res) {
    fs.exists(file, function (exists) {
        if (!exists) {
            res.writeHead(404, { "Content-Type": "application/json" });
            var out = { error: 'not_found', message: file + '木有找到' };
            res.end(JSON.stringify(out) + '\n');
            return;
        }
        var rs = fs.createReadStream(file);
        rs.on('error', function (e) {
            res.end();
        })
        var ct = content_type_for_path(file);
        res.writeHead(200, { "Content_type": ct });
        rs.pipe(res);
    })
}

function content_type_for_path(file) {
    var ext = path.extname(file);
    switch (ext.toLowerCase()) {
        case '.html': return 'text/html';
        case '.js': return 'text/javascript';
        case '.css': return 'text/css';
        case '.jpg': case '.jpeg': return 'image/jpeg';
        default: return 'text/plain';
    }
}
app.listen(1919);