var fs = require('fs');
var async = require('async');

function load_file_contents(path, callback) {
    async.waterfall([
        function (callback) {
            fs.open(path, 'r', callback);
        },
        function (f, callback) {
            fs.fstat(f, function (err, stats) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, f, stats);
                }
            });
        },
        function (f, stats, callback) {
            if (stats.isFils()) {
                var b = new Buffer(10000);
                fs.read(f, b, 0, 10000, null, function (err, br, buf) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(null, f, b.toString('utf8', 0, br));
                    }
                });
            } else {
                callback({
                    error: "这不是一个文件",
                    message: "无法读取"
                })
            }
        },
        function (f, contents, callback) {
            fs.close(f, function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, contetns);
                }
            });
        }
    ],
        function (err, file_contents) {
            callback(err, file_contents);
        });
}