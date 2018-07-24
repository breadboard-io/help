/*
@title Web Screen Grab
@input
{
  "content-type" : "text/uri-list",
  "example" : "http://google.com"
}
@output
{
  "content-type" : "image/png"
}
@pragma editor
*/

var phantom = require('phantom')
  , Promise = require('bluebird')
  ;

module.exports = function(req, res, next) {
  Promise
    .resolve(phantom.create())
    .then((ph) => {
      return Promise
              .resolve(ph.createPage())
              .tap((page) => {
                return page.property('viewportSize', { width: 1920, height: 1080 });
              })
              .then((page) => {
                var url = req.query.url || req.body;
                if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
                    url = "http://" + url;
                }

                console.log('opening page:', url);
                return page
                        .open(url)
                        .then((status) => {
                          console.log('opened:', url);
                          console.log('rendering png...');

                          return page.renderBase64('PNG');
                        })
                        .then((base64) => {
                          console.log('rendered png');

                          res.end(new Buffer(base64, 'base64'), 'binary');
                        });
              })
              .finally(() => {
                return ph.kill();
              });
    })
    .catch((err) => next);
};
