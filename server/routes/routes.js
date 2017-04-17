'use strict';

// middleware
var 
// StripeWebhook = require('stripe-webhook-middleware'),

isAuthenticated   = require('../middleware/auth').isAuthenticated,
isUnauthenticated = require('../middleware/auth').isUnauthenticated,
setRender         = require('middleware-responder').setRender,
setRedirect       = require('middleware-responder').setRedirect,
// stripeEvents      = require('./middleware/stripe-events'),
secrets           = require('../config/secrets');

// var boot          = require('./controllers/boot');

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


  // homepage and dashboard
  // router.get('/',
  //   setRedirect({auth: '/dashboard'}),
  //   isUnauthenticated,
  //   setRender('index'),
  //   main.getHome
  // );



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


  // router.get('/dashboard',
  //   setRender('dashboard/index'),
  //   setRedirect({auth: '/'}),
  //   isAuthenticated,
  //   dashboard.getDefault
  // );


  // router.get('/billing',
  //   setRender('dashboard/billing'),
  //   setRedirect({auth: '/'}),
  //   isAuthenticated,
  //   dashboard.getBilling
  // );



  // router.get('/profile',
  //   setRender('dashboard/profile'),
  //   setRedirect({auth: '/'}),
  //   isAuthenticated,
  //   dashboard.getProfile
  // );






  // user api stuff
  // router.post('/user',
  //   setRedirect({auth: '/', success: '/profile', failure: '/profile'}),
  //   isAuthenticated,
  //   users.postProfile
  // );


  // router.post('/user/billing',
  //   setRedirect({auth: '/', success: '/billing', failure: '/billing'}),
  //   isAuthenticated,
  //   users.postBilling
  // );


  // router.post('/user/plan',
  //   setRedirect({auth: '/', success: '/billing', failure: '/billing'}),
  //   isAuthenticated,
  //   users.postPlan
  // );

  // change password
  // router.post('/user/password',
  //   setRedirect({auth: '/', success: '/profile', failure: '/profile'}),
  //   isAuthenticated,
  //   passwords.postNewPassword
  // );



  //cancel subscriptions
  // working together with /user/delete router
  // router.get('/user/subscription/cancel',
  //   setRender('dashboard/profile'),
  //   setRedirect({auth: '/'}),
  //   isAuthenticated,
  //   dashboard.getCancelMyAccountAction
  // );

  // router.post('/user/delete',
  //   setRedirect({auth: '/', success: '/'}),
  //   isAuthenticated,
  //   users.deleteAccount
  // );


  // router.get('/user/profile/forward-email',
  //   setRender('dashboard/forward-email'),
  //   setRedirect({auth: '/'}),
  //   isAuthenticated,
  //   dashboard.updateForwardEmailAction
  // );



  // router.post('/user/update-forward-email',
  //   setRedirect({auth: '/', success: '/'}),
  //   isAuthenticated,
  //   users.postForwardEmailAction
  // );
  




};