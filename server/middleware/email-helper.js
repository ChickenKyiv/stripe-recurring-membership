'use strict';

//forgot pass
exports.forgotPasswordMailOptions = function(){

  var mailOptions = {

      to: user.email,
      from   : '"EasyMail support" <admin@easymail.io>', // sender address
      subject: 'Reset your password on stripe-a.herokuapp.com',
      text: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
  };

  return mailOptions;

};

// @TODO
//post token

exports.sendResetTokenMailOptions = function(){

  var mailOptions = {

      to: user.email,
      from   : '"EasyMail support" <admin@easymail.io>', // sender address
      subject: 'our stripe-a.herokuapp.com password has been changed',
      text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
    
  };

  return mailOptions;

};

