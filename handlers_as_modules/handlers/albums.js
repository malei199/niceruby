var helpers = require('./helpers.js');
var fs = require('fs');
var async = require('async');

exports.version = '0.1.0';
exports.handle_list_album = function (req, res) {
    load_albums_list(function (err, albums) {
        if (err) {
            helpers.send_failure(res, 500, err);
            return;
        }
        helpers.send_success(res, { albums: albums });
    });
}
exports.handle_get_album = function (req, res) {
    var getp = req.query;
    var page_num = getp.page ? getp.page : 0;
    var page_size = getp.size ? getp.size : 1000;
    if (isNaN(parseInt(page_num))) page_num = 0;
    if (isNaN(parseInt(page_size))) page_size = 1000;
    var core_url = req.params.album_name;

    var albums_name = req.params.album_name;
    load_album(
        albums_name,
        page_num,
        page_size,
        function (err, album_contents) {
            if (err && err.error == "no_such_album") {
                helpers.send_failulre(res, 404, err);
            } else if (err) {
                helpers.send_failure(res, 500, err);
            } else {
                helpers.send_success(res, { album_data: album_contents });
            }
        }
    )
}

function load_albums_list(callback) {
    fs.readdir(
        './../albums',
        function (err, files) {
            if (err) {
                callback(helpers.make_error('file_error', JSON.stringify(err)));
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
                            callback(helpers.make_error('file_error', JSON.stringify(err)));
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

function load_album(albums_name, page, page_size, callback) {
    fs.readdir(
        "./../albums/" + albums_name,
        function (err, files) {
            if (err) {
                if (err.code == "ENOENT") {
                    callback(helpers.no_such_ablum());
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
                            callback(helpers.make_error("file_error", JSON.stringify(err)));
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