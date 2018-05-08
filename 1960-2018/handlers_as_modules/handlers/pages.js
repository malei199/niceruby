var helpers = require('./helpers.js');
var fs = require('fs');
exports.version = '0.1.0';
exports.generete = function (req, res) {
    var page = req.params.page_name;
    if (page == 'home') {

    } else if (page == 'albums') {

    } else {
        helpers.send_failure(res, 404, helpers.invalid_resource());
        return;
    }
    fs.readFile('basic.html', function (err, contents) {
        if (err) {
            helpers.send_failure(res, 500, err);
            return;
        }
        contents = contents.toString('utf8');
        contents = contents.replace('{{PAGE_NAME}}', page);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(contents);
    });
}