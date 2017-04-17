'use strict';

// middleware
var 
// StripeWebhook = require('stripe-webhook-middleware'),

isAuthenticated   = require('../middleware/auth').isAuthenticated,
isUnauthenticated = require('../middleware/auth').isUnauthenticated,
setRender         = require('middleware-responder').setRender,
setRedirect       = require('middleware-responder').setRedirect,
secrets           = require('../config/secrets');



// controllers
var users     = require('../controllers/users-controller'),
main          = require('../controllers/main-controller'),
dashboard     = require('../controllers/dashboard-controller'),
passwords     = require('../controllers/passwords-controller'),
registrations = require('../controllers/registrations-controller'),



sessions      = require('../controllers/sessions-controller');


module.exports = function (app, passport) {

  // var router = express.Router();

  // router.get('/ping', function(req, res, next){
  //   res.send('pong!');
  // });






  // sessions
  // router.post('/login',
  //   setRedirect({auth: '/dashboard', success: '/dashboard', failure: '/'}),
  //   isUnauthenticated,
  //   sessions.postLogin
  // );

  // router.get('/logout',
  //   setRedirect({auth: '/', success: '/'}),
  //   isAuthenticated,
  //   sessions.logout
  // );



  




};