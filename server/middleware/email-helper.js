'use strict';

var nodemailer = require('nodemailer');
// var mailgunApiTransport = require('nodemailer-mailgunapi-transport');

var secrets    = require('../config/secrets');


//forgot pass
function forgotPasswordMailOptions (){

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

function sendResetTokenMailOptions (){

  var mailOptions = {

      to: user.email,
      from   : '"EasyMail support" <admin@easymail.io>', // sender address
      subject: 'our stripe-a.herokuapp.com password has been changed',
      text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
    
  };

  return mailOptions;

};

function forwardEmailUpdateMailOptions (){

  var mailOptions = {

      to     : user.email,
      from   : '"EasyMail support" <admin@easymail.io>', // sender address
      subject: 'Your stripe-a.herokuapp.com forward email has been changed',
      text: 'Hello,\n\n' +
          'This is a confirmation that the forward email field for your account ' + user.email + ' has just been changed.\n'
    
  };

  return mailOptions;

}

function resetPasswordEmail (token, user, done) {
    
  var transporter = nodemailer.createTransport(secrets.emailServer);
  // var transporter = nodemailer.createTransport(mailgunApiTransport(secrets.mailgun));
  
  // req.get('host')
  const mailOptions = forgotPasswordMailOptions();


  transporter.sendMail(mailOptions, function(err) {
    req.flash('info', { msg: 'An e-mail has been sent to ' + user.email + ' with further instructions.' });
    done(err, 'done');
  });

}


function resetPasswordConfirmationEmail (user, done) {

  var transporter = nodemailer.createTransport(secrets.emailServer);
  // var transporter = nodemailer.createTransport(mailgunApiTransport(secrets.mailgun));
 
  const mailOptions = sendResetTokenMailOptions();


  transporter.sendMail(mailOptions, function(err) {
    req.flash('success', { msg: 'Success! Your password has been changed.' });
    done(err);
  });

}

function updateForwardEmailConfirmation( user, done ){

  var transporter = nodemailer.createTransport(secrets.emailServer);
  // var transporter = nodemailer.createTransport(mailgunApiTransport(secrets.mailgun));

  const mailOptions = forwardEmailUpdateMailOptions();


  transporter.sendMail(mailOptions, function(err) {
    req.flash('success', { msg: 'Success! Your forward email has been changed.' });
    done(err);
  });
}


module.exports = {
  resetPasswordEmail,
  resetPasswordConfirmationEmail
}