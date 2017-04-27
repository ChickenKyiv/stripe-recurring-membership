'use strict';

// middleware
var 
isAuthenticated   = require('../middleware/auth').isAuthenticated,
isUnauthenticated = require('../middleware/auth').isUnauthenticated,
setRender         = require('middleware-responder').setRender,
setRedirect       = require('middleware-responder').setRedirect;

// controllers
var 
// main      = require('../controllers/main-controller'),
    dashboard = require('../controllers/dashboard-controller');

module.exports = function (app, passport) {

  // dashboard
  app.route('/dashboard')
     .all(setRedirect({auth: '/'}))
     .all(isAuthenticated)     
     .get(setRender('dashboard/index'), dashboard.getDefault);

  app.route('/billing')
     .all(setRedirect({auth: '/'}))
     .all(isAuthenticated)     
     .get(setRender('dashboard/billing'), dashboard.getBilling);

  app.route('/profile')
     .all(setRedirect({auth: '/'}))
     .all(isAuthenticated)     
     .get(setRender('profile/index'), dashboard.getDefault); //@TODO move to routes/profile.js

// dashboard.getProfile
  // router.get('/profile',
  //   setRender('dashboard/profile'),
  //   setRedirect({auth: '/'}),
  //   isAuthenticated,
  //   dashboard.getProfile
  // );

};

  // router.get('/',
  //   setRedirect({auth: '/dashboard'}),
  //   isUnauthenticated,
  //   setRender('index'),
  //   main.getHome
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









