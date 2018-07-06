/*
@title Example Email send
@input
{
  "content-type" : "text/plain",
  "example" : "Hello from TaskMill"
}
*/

var sdk = require('breadboard-sdk');

module.exports = function(ctx, res){
  let body = {
      to      : 'hello@breadboard.io'
    , from    : 'hello@breadboard.io'
    , subject : 'subject: ' + req.body
    , text    : req.body
  };

  return sdk
          .function('https://github.com/breadboard-io/functions/blob/master/lib/email.js')
          .call({ ctx, body, forward_auth });
};
