var fs = require('fs');
var path = require('path');
var http = require('http');
var url = require('url');
var qs = require('querystring');

function handle_incoming_request(req, res) {
    req.parsed_url = url.parse(req.url, true);
    var core_url = req.parsed_url.pathname;
    if (core_url.substring(0, 7) == '/pages/') {
        serve_page(req, res);
    } else if (core_url.substring(0, 11) == '/templates/') {
        serve_static_file('templates/' + core_url.substring(11), res);
    } else if (core_url.substring(0, 9) == '/content/') {
        serve_static_file('contents/' + core_url.substring(9), res);
    } else if (core_url == '/albums.json') {
        handle_list_album(req, res);
    } else if (core_url.substr(0, 7) == '/albums' && core_url.substr(core_url.length - 5) == '.json') {
        handle_get_album(req, res);
    } else {
        send_failure(res, 404, invalid_resource());
    }
}

function serve_page(req, res) {
    var core_url = req.parsed_url.pathname;
    var page = core_url.substring(7); //remove /pages/
    var pages = core_url.substring(7, 13);
    if (page == 'home') {

    } else if (pages == 'albums') {
        page = core_url.substring(7, 13);
    } else {
        send_failure(res, 404, invalid_resource());
        return;
    }
    fs.readFile('basic.html', function (err, contents) {
        if (err) {
            send_failure(res, 500, err);
            return;
        }
        contents = contents.toString('utf8');
        contents = contents.replace('{{PAGE_NAME}}', page);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(contents);
    });

}
function load_albums_list(callback) {
    fs.readdir(
        './../albums',
        function (err, files) {
            if (err) {
                callback(make_error('file_error', JSON.stringify(err)));
                return;
            }
            var only_dirs = [];
            (function iterator(index) {
                if (index == files.length) {
                    callback(null, only_dirs);
                    return;
                }
                fs.stat(
                    './../albums/' + files[index],
                    function (err, stats) {
                        if (err) {
                            callback(make_error('file_error', JSON.stringify(err)));
                            return;
                        }
                        if (stats.isDirectory()) {
                            var obj = { name: files[index] }
                            only_dirs.push(obj);
                        }
                        iterator(index + 1);
                    }
                )
            })(0);
        }
    )
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
function handle_list_album(req, res) {
    load_albums_list(function (err, albums) {
        if (err) {
            send_failure(res, 500, err);
            return;
        }
        send_success(res, { albums: albums });
    });
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
function handle_rename_album(req, res) {
    var core_url = req.parsed_url.pathname;
    var parts = core_url.split('/');
    if (parts.length != 4) {
        send_failure(res, 404, invalid_resource(core_url));
        return;
    }
    var albums_name = parts[2];
    var json_body = '';
    req.on(
        'readable',
        function () {
            var d = req.read();
            if (d) {
                if (typeof d == 'string') {
                    json_body += d;
                } else if (typeof d == 'object' && d instanceof Buffer) {
                    json_body += d.toString('utf8');
                }
            }
        }
    );
    req.on(
        'end',
        function () {
            if (json_body) {
                try {
                    var album_data = JSON.parse(json_body);
                    if (!album_data.albums_name) {
                        send_failure(res, 403, missing_data('album_name'));
                        return;
                    }
                } catch (e) {
                    send_failure(res, 403, bad_json());
                    return;
                }
                do_rename(
                    albums_name,
                    album_data.album_data,
                    function (err, results) {
                        if (err && err.code == 'ENOENT') {
                            send_failure(res, 403, no_such_ablum());
                            return;
                        } else if (err) {
                            send_failure(res, 500, file_error(err));
                            return;
                        }
                        send_success(res, null);
                    }
                );
            } else {
                send_failure(res, 403, bad_json());
                res.end();
            }
        }
    );
}
function load_album(albums_name, page, page_size, callback) {
    fs.readdir(
        "./../albums/" + albums_name,
        function (err, files) {
            if (err) {
                if (err.code == "ENOENT") {
                    callback(no_such_ablum());
                } else {
                    callback({ error: "files_error", message: JSON.stringify(err) });
                }
                return;
            }
            var only_files = [];
            var path = "./../albums/" + albums_name + "/";
            (function iterator(index) {
                if (index == files.length) {
                    var ps = only_files.splice(page * page_size, page_size);
                    var obj = {
                        short_name: albums_name,
                        photos: ps
                    };
                    callback(null, obj);
                    return;
                }
                fs.stat(
                    path + files[index],
                    function (err, stats) {
                        if (err) {
                            callback(make_error("file_error", JSON.stringify(err)));
                            return;
                        }
                        if (stats.isFile()) {
                            var obj = {
                                filename: files[index],
                                desc: files[index]
                            };
                            only_files.push(obj);
                        }
                        iterator(index + 1)
                    }
                );
            })(0);
        }
    )
}
function handle_get_album(req, res) {
    var getp = req.parsed_url.query;
    var page_num = getp.page ? getp.page : 0;
    var page_size = getp.size ? getp.size : 1000;
    if (isNaN(parseInt(page_num))) page_num = 0;
    if (isNaN(parseInt(page_size))) page_size = 1000;
    var core_url = req.parsed_url.pathname;

    var albums_name = core_url.substr(7, core_url.length - 12);
    load_album(
        albums_name,
        page_num,
        page_size,
        function (err, album_contents) {
            if (err && err.error == "no_such_album") {
                send_failulre(res, 404, err);
            } else if (err) {
                send_failure(res, 500, err);
            } else {
                send_success(res, { album_data: album_contents });
            }
        }
    )
}

function make_error(err, msg) {
    var e = new Error(msg);
    e.code = err;
    return e;
}
function send_success(res, data) {
    res.writeHead(200, { "Content-Type": "application/json" });
    var output = { error: null, data: data };
    res.end(JSON.stringify(output) + '\n');
}
function send_failure(res, code, err) {
    //var code = (err.code) ? err.code : err.name;
    let _code = code;
    res.writeHead(_code, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: _code, message: err.message }) + '\n');
}
function invalid_resource() {
    return make_error('invalid_resource', 'the requested resource dost no exist');
}
function no_such_ablum() {
    return make_error('no_such_ablum', 'the specified ablum does not exist');
}

var s = http.createServer(handle_incoming_request);
s.listen(1919);