/*
@title Example SMS
*/

var sdk = require('breadboard-sdk');

module.exports = function(ctx, res){
  let body = {
      'to'    : '+12532143749'
    , 'body'  : ctx.body
  };

  return sdk
          .function('https://github.com/breadboard-io/functions/blob/master/lib/sms.js')
          .call({ ctx, body, authorization : true });
};
