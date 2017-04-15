'use strict';

// middleware
var StripeWebhook = require('stripe-webhook-middleware'),
isAuthenticated   = require('./middleware/auth').isAuthenticated,
isUnauthenticated = require('./middleware/auth').isUnauthenticated,
setRender         = require('middleware-responder').setRender,
setRedirect       = require('middleware-responder').setRedirect,
stripeEvents      = require('./middleware/stripe-events'),
secrets           = require('./config/secrets');

// controllers
var registrations = require('./controllers/registrations-controller');

module.exports    = function (app, passport) {

  app.get('/signup2',
    setRedirect({auth: '/dashboard'}),
    isUnauthenticated,
    setRender('signup2'),
    registrations.getSignup2
  );


  app.post('/signup2',
    setRedirect({auth: '/dashboard', success: '/signup2-1', failure: '/signup2'}),
    // setRedirect({auth: '/dashboard', success: '/dashboard', failure: '/signup2'}),
    isUnauthenticated,
    registrations.postSignup2
  );


//user registration before purchase
  app.post('/signupshort',
    setRedirect({auth: '/dashboard', success: '/dashboard', failure: '/signup2'}),
    isUnauthenticated,
    registrations.postSignupFirstTime
  );


  app.get('/signup2-1',
    setRedirect({auth: '/dashboard'}),
    isUnauthenticated,
    setRender('signup2-1'),
    registrations.getSignup2
  );



  //display whois form 
  //@TODO change URL name
  app.get('/whois',
    setRender('dashboard/whois-settings'),
    setRedirect({auth: '/'}),
    isAuthenticated,
    dashboard.getWhoisForm
  );

//@TODO replace redirect rules
  app.post('/whois-settings',
    setRedirect({ auth: '/', success: '/profile', failure: '/profile' }),
    isAuthenticated,
    users.postWhois
  );



};