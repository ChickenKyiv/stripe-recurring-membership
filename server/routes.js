'use strict';

// middleware
var 
// StripeWebhook = require('stripe-webhook-middleware'),

isAuthenticated   = require('./middleware/auth').isAuthenticated,
isUnauthenticated = require('./middleware/auth').isUnauthenticated,
setRender         = require('middleware-responder').setRender,
setRedirect       = require('middleware-responder').setRedirect,
// stripeEvents      = require('./middleware/stripe-events'),
secrets           = require('./config/secrets');

// var boot          = require('./controllers/boot');

// controllers
var users     = require('./controllers/users-controller'),
main          = require('./controllers/main-controller'),
dashboard     = require('./controllers/dashboard-controller'),
passwords     = require('./controllers/passwords-controller'),
registrations = require('./controllers/registrations-controller'),



sessions      = require('./controllers/sessions-controller');


//@TODO redo this. 

// var stripeWebhook = new StripeWebhook({
//   stripeApiKey: secrets.stripeNextVersion.private.stripe.testSecretKey,
//   respond: true
// });



module.exports = function (app, passport) {

  app.get('/ping', function(req, res, next){
    res.send('pong!');
  });


  // homepage and dashboard
  app.get('/',
    setRedirect({auth: '/dashboard'}),
    isUnauthenticated,
    setRender('index'),
    main.getHome
  );

  

  // sessions
  app.post('/login',
    setRedirect({auth: '/dashboard', success: '/dashboard', failure: '/'}),
    isUnauthenticated,
    sessions.postLogin
  );

  app.get('/logout',
    setRedirect({auth: '/', success: '/'}),
    isAuthenticated,
    sessions.logout
  );






// This routes was moved to another file.
//------------
  // app.get('/signup2',
  //   setRedirect({auth: '/dashboard'}),
  //   isUnauthenticated,
  //   setRender('signup2'),
  //   registrations.getSignup2
  // );



  // app.post('/signup2',
  //   setRedirect({auth: '/dashboard', success: '/signup2-1', failure: '/signup2'}),
  //   // setRedirect({auth: '/dashboard', success: '/dashboard', failure: '/signup2'}),
  //   isUnauthenticated,
  //   registrations.postSignup2
  // );

//user registration before purchase
  // app.post('/signupshort',
  //   setRedirect({auth: '/dashboard', success: '/dashboard', failure: '/signup2'}),
  //   isUnauthenticated,
  //   registrations.postSignupFirstTime
  // );


  // app.get('/signup2-1',
  //   setRedirect({auth: '/dashboard'}),
  //   isUnauthenticated,
  //   setRender('signup2-1'),
  //   registrations.getSignup2
  // );


//---------------





  app.get('/dashboard',
    setRender('dashboard/index'),
    setRedirect({auth: '/'}),
    isAuthenticated,
    dashboard.getDefault
  );

  app.get('/billing',
    setRender('dashboard/billing'),
    setRedirect({auth: '/'}),
    isAuthenticated,
    dashboard.getBilling
  );


  app.get('/profile',
    setRender('dashboard/profile'),
    setRedirect({auth: '/'}),
    isAuthenticated,
    dashboard.getProfile
  );






  // user api stuff
  app.post('/user',
    setRedirect({auth: '/', success: '/profile', failure: '/profile'}),
    isAuthenticated,
    users.postProfile
  );

  app.post('/user/billing',
    setRedirect({auth: '/', success: '/billing', failure: '/billing'}),
    isAuthenticated,
    users.postBilling
  );

  app.post('/user/plan',
    setRedirect({auth: '/', success: '/billing', failure: '/billing'}),
    isAuthenticated,
    users.postPlan
  );

  // change password
  app.post('/user/password',
    setRedirect({auth: '/', success: '/profile', failure: '/profile'}),
    isAuthenticated,
    passwords.postNewPassword
  );



  //cancel subscriptions
  // working together with /user/delete router
  app.get('/user/subscription/cancel',
    setRender('dashboard/profile'),
    setRedirect({auth: '/'}),
    isAuthenticated,
    dashboard.getCancelMyAccountAction
  );

  app.post('/user/delete',
    setRedirect({auth: '/', success: '/'}),
    isAuthenticated,
    users.deleteAccount
  );


  app.get('/user/profile/forward-email',
    setRender('dashboard/forward-email'),
    setRedirect({auth: '/'}),
    isAuthenticated,
    dashboard.updateForwardEmailAction
  );

  // app.post('/user/update-forward-email',
  //   setRedirect({auth: '/', success: '/'}),
  //   isAuthenticated,
  //   users.postForwardEmailAction
  // );
  



  // // use this url to receive stripe webhook events
  // app.post('/stripe/events',
  //   stripeWebhook.middleware,
  //   stripeEvents
  // );



};