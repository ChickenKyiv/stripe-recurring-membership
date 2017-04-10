'use strict';

//forgot pass
// var mailOptions = {
//         to: user.email,
//         from   : '"EasyMail support" <admin@easymail.io>', // sender address
//         subject: 'Reset your password on stripe-a.herokuapp.com',
//         text: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' +
//           'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//           'http://' + req.headers.host + '/reset/' + token + '\n\n' +
//           'If you did not request this, please ignore this email and your password will remain unchanged.\n'
//       };

exports.function1 = function(view){
  return function(req, res, next){
    if(view){
      req.render = view;
    }
    next();
  };
};

// @TODO
//post token
// var mailOptions = {
//         to: user.email,
//         from   : '"EasyMail support" <admin@easymail.io>', // sender address
//         subject: 'Your stripe-a.herokuapp.com password has been changed',
//         text: 'Hello,\n\n' +
//           'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
//       };

exports.function2 = function(view){
  return function(req, res, next){
    if(view){
      req.render = view;
    }
    next();
  };
};