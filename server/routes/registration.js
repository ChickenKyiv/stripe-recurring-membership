'use strict';

// middleware
var 
isAuthenticated   = require('../middleware/auth').isAuthenticated,
isUnauthenticated = require('../middleware/auth').isUnauthenticated,
setRender         = require('middleware-responder').setRender,
setRedirect       = require('middleware-responder').setRedirect,
stripeEvents      = require('../middleware/stripe-events'),
secrets           = require('../config/secrets');

// controllers
var registrations = require('../controllers/registrations-controller'),
// @TODO split controller action's to a different place.
users             = require('../controllers/users-controller');
// dashboard         = require('../controllers/dashboard-controller')


module.exports    = function (app, passport) {

  // registrations


  app.route('/signup2') //@TODO change this path and redirect and render
     .all(setRedirect({ auth: '/whois', success: '/whois', failure: '/signup2' }))
     .all(isUnauthenticated)
     .get(setRender('signup2'), registrations.getSignup)
     .post(registrations.postSignup2);


  // app.route('signupshort')
  //    .all(setRedirect({auth: '/dashboard', success: '/dashboard', failure: '/signup2'}))
  //    .all(isUnauthenticated)
  //    .get(setRender('signup2-1'), registrations.getSignup2)
  //    .post(registrations.postSignupFirstTime);

//user registration before purchase
  // app.post('/signupshort',
  //   setRedirect({auth: '/dashboard', success: '/dashboard', failure: '/signup2'}),
  //   isUnauthenticated,
  //   registrations.postSignupFirstTime
  // );


  app.route('/whois')
     .all(setRedirect({ auth: '/', success: '/billing-form', failure: '/profile' }))
     .all(isAuthenticated)
     .get(setRender('signup/whois'), registrations.getWhoisForm2)
     .post(registrations.postWhois);




  //display whois form 
  //@TODO change URL name
  // app.get('/whois',
  //   setRender('dashboard/whois-settings'),
  //   setRedirect({auth: '/'}),
  //   isAuthenticated,
  //   dashboard.getWhoisForm
  // );

//@TODO replace redirect rules
  // app.post('/whois-settings',
  //   setRedirect({ auth: '/', success: '/profile', failure: '/profile' }),
  //   isAuthenticated,
  //   users.postWhois
  // );

  //billing form
  // app.route('/')
  // .all()
  // .all(isAuthenticated)
  // .get()
  // .post()

};