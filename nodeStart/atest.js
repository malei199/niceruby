var amgr = require('./album_mgr');

amgr.albums('./', function (err, albums) {
    if (err) {
        console.log('测试出错信息' + JSON.stringify(err));
        return;
    }
    (function iterator(index) {
        if (index == albums.length) {
            console.log('完成');
            return;
        }
        albums[index].photos(function (err, photos) {
            if (err) {
                console.log('读取错误相册' + JSON.stringify(err));
                return;
            }
            console.log(albums[index].name);
            console.log(photos);
            console.log('------');
            iterator(index + 1);
        });
    })(0);
});