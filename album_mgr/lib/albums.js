var fs = require('fs');
var path = require('path');
var album = require('./albums.js');
exports.version = '1.0.0';
exports.create_album = function (path) {
    return new Album(path);
}
exports.albums = function (root, callback) {
    fs.readdir(
        root + '/albums',
        function (err, files) {
            if (err) {
                callback();
                return;
            }
            var album_list = [];
            (function iterator(index) {
                if (index == files.length) {
                    callback(null, album_list);
                    return;
                }
                fs.stat(
                    root + 'albums/' + files[index],
                    function (err, stats) {
                        if (err) {
                            callback({
                                error: "file_error",
                                message: JSON.stringify(err)
                            });
                            return;
                        }
                        if (stats.isDirectory()) {
                            var p = root + "albums/" + files[index];
                            album_list.push(album.create_album(p));
                        }
                        iterator(index + 1)
                    }
                )
            })(0)
        }
    );
};
function Album(album_path) {
    this.name = path.basename(album_path);
    this.path = album_path;
}

Album.prototype.name = null;
Album.prototype.path = null;
Album.prototype._photos = null;

Album.prototype.photos = function (callback) {
    if (this._photos != null) {
        callback(null, this._photos);
        return;
    }
    var self = this;
    fs.readdir(
        self.path,
        function (err, files) {
            if (err) {
                if (err.code == "ENOENT") {
                    callback(no_such_album());
                } else {
                    callback({
                        error: "file_error",
                        message: JSON.stringify(err)
                    });
                }
                return;
            }
            var only_files = [];
            (function iterator(index) {
                if (index == files.length) {
                    self._photos = only_files;
                    callback(null, self._photos);
                    return;
                }
                fs.stat(
                    self.path + '/' + files[index],
                    function (err, stats) {
                        if (err) {
                            callback({
                                error: "file_error",
                                message: JSON.stringify(err)
                            });
                            return;
                        }
                        if (stats.isFile()) {
                            only_files.push(files[index]);
                        }
                        iterator(index + 1);
                    }
                );
            })(0);
        }
    );
}
function no_such_album() {
    return {
        error: "no_such_album",
        message: "这个相册木有发现"
    };
}