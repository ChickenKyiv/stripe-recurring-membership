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
     // .get(setRender('dashboard/index'), dashboard.getDefault);
     .get(setRender('dashboard/billing'), dashboard.getBilling);


};


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









