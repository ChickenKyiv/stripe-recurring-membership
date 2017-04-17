'use strict';

// middleware
// var express       = require('express');
var secrets       = require('../config/secrets'),
isAuthenticated   = require('../middleware/auth').isAuthenticated,
isUnauthenticated = require('../middleware/auth').isUnauthenticated,
setRender         = require('middleware-responder').setRender,
setRedirect       = require('middleware-responder').setRedirect;

// controllers
var passwords     = require('../controllers/passwords-controller');

module.exports    = function (app) {

  // var router = express.Router();

  // forgot password
  // router.get('/forgot', function(req, res){

  //   // setRedirect({auth: '/dashboard'});
  //   req.redirect = { auth: '/dashboard', success: '/forgot', failure: '/forgot' };

  //   if (req.isAuthenticated()) {
  //     return res.redirect(req.redirect.auth);
  //   }

  //   var form       = {},
  //       error      = null,
  //       formFlash  = req.flash('form'),
  //       errorFlash = req.flash('error');

  //   if (formFlash.length) {
  //     form.email = formFlash[0].email;
  //   }

  //   if (errorFlash.length) {
  //     error = errorFlash[0];
  //   }

  //   res.render(req.redirect.success, {
  //     title: 'Forgot Password',
  //     form : form,
  //     error: error
  //   });



  // });

  app.get('/forgot',
    setRedirect({auth: '/dashboard'}),
    isUnauthenticated,
    setRender('forgot'),
    passwords.getForgotPassword
  );


  app.post('/forgot',
    setRedirect({auth: '/dashboard', success: '/forgot', failure: '/forgot'}),
    isUnauthenticated,
    passwords.postForgotPassword
  );


// router.post('/forgot/', function(req, res){

  
//   // console.log(util.inspect( req.params, false, null ));  
//   console.log(util.inspect( req.body, false, null ));
//   console.log( req.body.id );

//   const id = req.body.id;
  

//   res.render('edit', video );
// // req.redirect = {auth: '/dashboard', success: '/forgot', failure: '/forgot'};

//   res.redirect(req.redirect.failure); 
// });


  // reset tokens
  app.get('/reset/:token',
    setRedirect({auth: '/dashboard', failure: '/forgot'}),
    isUnauthenticated,
    setRender('reset'),
    passwords.getToken
  );

  app.post('/reset/:token',
    setRedirect({auth: '/dashboard', success: '/dashboard', failure: 'back'}),
    isUnauthenticated,
    passwords.postToken
  );


};	


// Fancy console.log
function output (err, data) {
  console.dir (err || data, {
    depth: null,
    colors: true
  });
}