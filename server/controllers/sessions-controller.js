'use strict';

// This controller handles setting/clearing sessions when
// logging in and out.

var passport = require('passport');

//old version
exports.postLoginOld = function(req, res, next){

  req.assert('email',    'Please sign up with a valid email.').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len(4);

  var errors = req.validationErrors();
  
  if (errors) {
    req.flash('errors', errors);
    return res.redirect(req.redirect.failure);
  }
  // this middleware can be found in /server/middleware/passport.js
  // re: passport.use('login', ...);
  passport.authenticate('login', {
    successRedirect: req.redirect.success,
    failureRedirect: req.redirect.failure,
    failureFlash : true
  })(req, res, next);

};


//new
exports.postLogin = function(req, res, next){

  req.assert('email',    'Please sign up with a valid email.').isEmail();
  req.assert('password', 'Password must be at least 4 characters long').len(4);

  var errors = req.validationErrors();
  



  if (errors) {
    req.flash('errors', errors);
    return res.redirect(req.redirect.failure);
  }

  // issue a remember me cookie if the option was checked
  // I think it wouldn't work when checkbox unchecked
  // if (!req.body.remember_me) { return next(); }

  // var token = utils.generateToken(64);

  // console.log( req.user );
  // console.log( req.user.id );

  // Token.save(token, { userId: req.user.id }, function(err) {
  //   if (err) { return done(err); }
  //   res.cookie('remember_me', token, { 
  //     path: '/', 
  //     httpOnly: true, 
  //     maxAge: 604800000 
  //   }); // 7 days
  //   return next();
  // });


  // this middleware can be found in /server/middleware/passport.js
  // re: passport.use('login', ...);
  passport.authenticate('login', {
    successRedirect: req.redirect.success,
    failureRedirect: req.redirect.failure,
    failureFlash : true
  })(req, res, next);

};


exports.logout = function(req, res){

  var time = 60 * 1000;

  req.logout();
  req.session.cookie.maxAge = time;
  req.session.cookie.expires = new Date(Date.now() + time);
  req.session.touch();
  req.flash('success', 'Successfully logged out.');
  res.redirect(req.redirect.success);
  
};