/*
@title Sepia Image
@input
{
  "content-type" : "text/uri-list",
  "example" : "https://assets-cdn.github.com/images/modules/logos_page/Octocat.png"
}
@output
{
  "content-type" : "image/png"
}
@pragma editor
*/

var gm = require('gm');
var request = require('request');

module.exports = function(req, res, next) {
  var url = req.body;
  if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
  }

  gm(request.get(url))
    .sepia()
    .stream()
    .pipe(res);
};
