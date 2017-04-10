'use strict';

var nodemailer = require('nodemailer');
var async      = require('async');
var crypto     = require('crypto');
var passport   = require('passport');
var User       = require('../models/user');
var secrets    = require('../config/secrets');

// Show Registration Page

// exports.getSignup = function(req, res){

//   var form = {},
//   error = null,
//   formFlash = req.flash('form'),
//   errorFlash = req.flash('error');

//   if (formFlash.length) {
//     form.email = formFlash[0].email;
//   }
//   if (errorFlash.length) {
//     error = errorFlash[0];
//   }
//   res.render('signup', {form: form, error: error});

// };

exports.getSignup2 = function(req, res){

  var form       = {},
      error      = null,
      formFlash  = req.flash('form'),
      errorFlash = req.flash('error');

  // console.log( req );

  if (formFlash.length) {
    form.email = formFlash[0].email;
  }

  if (errorFlash.length) {
    error = errorFlash[0];
  }
  // console.log('123');

  res.render('signup2', {
    form: form, 
    error: error
  });

};

// exports.postSignup = function(req, res, next){

//   req.assert('email', 'Please sign up with a valid email.').isEmail();
//   req.assert('password', 'Password must be at least 6 characters long').len(6);

//   var errors = req.validationErrors();

//   if (errors) {
//     req.flash('errors', errors);
//     req.flash('form', {
//       email: req.body.email
//     });
//     return res.redirect('/signup');
//   }

//   console.log( req.body );

//   // calls next middleware to authenticate with passport
//   passport.authenticate('signup', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/signup',
//     failureFlash : true
//   })(req, res, next);
  
// };


exports.postSignup2 = function(req, res, next){

  req.assert('email',    'Please sign up with a valid email.').isEmail();
  req.assert('password', 'Password must be at least 6 characters long').notEmpty().len(6);

  req.assert('password_confirm', 'Confirm password must be at least 6 characters long').notEmpty().len(6);
  req.assert('password_confirm', 'Passwords must match').equals(req.body.password);

  req.assert('domain',   'Please fill a domain name').notEmpty();

  var errors = req.validationErrors();

  // console.log( 'submit' );

  // console.log( req.body );
  // console.log( errors );

  // var plans  = User.getPlans();
  // console.log(plans);

  if (errors) {
    req.flash('errors', errors);
    req.flash('form', {
      email  : req.body.email,
      domain : req.body.domain

    });
    return res.redirect('/signup2');
  } 
  // else {
  //   req.flash('info', {msg:'zaebok'});
  // }

  // res.redirect('/signup2-1');

  // calls next middleware to authenticate with passport
  // this middleware can be found in /server/middleware/passport.js
  passport.authenticate('signup2', {
    successRedirect: '/signup2-1',
    failureRedirect: '/signup2',
    failureFlash : true
  })(req, res, next);

  // passport.authenticate('signup2', {
  //   successRedirect: '/dashboard',
  //   failureRedirect: '/signup2',
  //   failureFlash : true
  // })(req, res, next);
  
};

exports.postSignupFirstTime = function(req, res, next){



// !important - check if this email was registered before. 
// But take less attention, than to registration with purchase.

//if fields, that we've posted to this method don't apply to our rules - we need to do something.
// maybe return error or something like it  


  // req.assert('email',    'Please sign up with a valid email.').isEmail();
  // req.assert('password', 'Password must be at least 6 characters long').notEmpty().len(6);

  // req.assert('password_confirm', 'Confirm password must be at least 6 characters long').notEmpty().len(6);
  // req.assert('password_confirm', 'Passwords must match').equals(req.body.password);

  // req.assert('domain',   'Please fill a domain name').notEmpty();

  // var errors = req.validationErrors();

  // console.log( 'submit' );

  console.log( req.body );
  // console.log( errors );

  // var plans  = User.getPlans();
  // console.log(plans);

  // if (errors) {
  //   req.flash('errors', errors);
  //   req.flash('form', {
  //     email  : req.body.email,
  //     domain : req.body.domain
  //   });
  //   return res.redirect('/signup2');

  // } 
  // else {
  //   req.flash('info', 'zaebok');
  // }

  // calls next middleware to authenticate with passport
  // this middleware can be found in /server/middleware/passport.js
  // passport.authenticate('signup2', {
  //   successRedirect: '/dashboard',
  //   failureRedirect: '/signup2',
  //   failureFlash : true
  // })(req, res, next);
  
};