'use strict';

// middleware
var 
isAuthenticated   = require('../middleware/auth').isAuthenticated,
isUnauthenticated = require('../middleware/auth').isUnauthenticated,
setRender         = require('middleware-responder').setRender,
setRedirect       = require('middleware-responder').setRedirect,
stripeEvents      = require('../middleware/stripe-events'),
secrets           = require('../config/secrets.js');

// controllers
var registrations = require('../controllers/registrations-controller'),
// @TODO split controller action's to a different place.
users             = require('../controllers/users-controller');

var  dashboard         = require('../controllers/dashboard-controller');


module.exports    = function (app, passport) {

  // registrations


  app.route('/signup2') //@TODO change this path and redirect and render
     .all(setRedirect({ auth: '/whois', success: '/whois', failure: '/signup2' }))
     .all(isUnauthenticated)
     .get(setRender('signup2'), registrations.getSignup)     
     .post(registrations.postSignup2);

  app.route('/whois')
     .all(setRedirect({ auth: '/', success: '/billing-form', failure: '/whois' }))
     .all(isAuthenticated)
     .get(setRender('signup/whois'), registrations.getWhoisForm2) // @TODO - must be registered and logged in
     .post(registrations.postWhois);




  //display whois form 
  //@TODO change URL name
  // app.get('/whois',

  //billing form
app.route('/billing-form')
  .all(setRedirect({ auth: '/', success: '/dashboard', failure: '/billing-form' }))
  .all(isAuthenticated)
  .get(setRender('signup/billing'), dashboard.getBilling)
  .post(dashboard.postBilling);
  
  ;
};