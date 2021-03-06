$(function () {
    var tmpl = {};
    var tdata = {};
    var initPage = function () {
        $.get('/templates/home.html', function (d) {
            tmpl = d;
        });
        $.getJSON('/v1/albums.json', function (d) {
            $.extend(tdata, d.data);
        });
        $(document).ajaxStop(function () {
            var renderedPage = Mustache.to_html(tmpl, tdata);
            $('body').html(renderedPage);
        });
    }();
});