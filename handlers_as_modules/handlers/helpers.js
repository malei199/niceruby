exports.version = '0.1.0';

exports.make_error = function (err, msg) {
    var e = new Error(msg);
    e.code = err;
    return e;
}
exports.send_success = function (res, data) {
    res.writeHead(200, { "Content-Type": "application/json" });
    var output = { error: null, data: data };
    res.end(JSON.stringify(output) + '\n');
}
exports.send_failure = function (res, code, err) {
    //var code = (err.code) ? err.code : err.name;
    let _code = code;
    res.writeHead(_code, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: _code, message: err.message }) + '\n');
}
exports.invalid_resource = function () {
    return exports.make_error('invalid_resource', 'the requested resource dost no exist');
}
exports.no_such_ablum = function () {
    return exports.make_error('no_such_ablum', 'the specified ablum does not exist');
}