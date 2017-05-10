'use strict';

// middleware
var 
isAuthenticated   = require('../middleware/auth').isAuthenticated,
isUnauthenticated = require('../middleware/auth').isUnauthenticated,
setRender         = require('middleware-responder').setRender,
setRedirect       = require('middleware-responder').setRedirect;

// controllers
var dashboard = require('../controllers/dashboard-controller');

module.exports = function (app, passport) {

  // dashboard
  app.route('/dashboard')
     .all(setRedirect({auth: '/'}))
     .all(isAuthenticated)     
     .get(setRender('dashboard/index'), dashboard.getDefault);

  //@TODO check and compare this routes with 3rd registration step   
  // app.route('/billing')
  //    .all(setRedirect({auth: '/'}))
  //    .all(isAuthenticated)     
  //    .get(setRender('dashboard/billing'), dashboard.getBilling)
  //    .post(dashboard.postBilling); // this must be replaced by post user/plan

  // //@TODO i think this is not finished   
  // app.route('/update-card')
  //    .all(setRedirect({auth: '/'}))
  //    .all(isAuthenticated)
  //    .get(setRender('dashboard/update-card'), dashboard.getBilling);   

     

};