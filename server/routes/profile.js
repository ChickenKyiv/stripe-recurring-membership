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


  app.route('/profile')
     .all(setRedirect({auth: '/', success: '/profile', failure: '/profile'}))
     .all(isAuthenticated)     
     .get(setRender('profile/index'), dashboard.getProfile) //@TODO move to different controller  
     .post(dashboard.postProfile);


  //switch plan
  // @TODO change this. right now all stuff included on dashboard billing
  app.route('/subscription/switch/:subscription_id')
	   .all(setRedirect({auth: '/', success: '/'})) //@TODO change redirect object
	   .all(isAuthenticated)	
	   .get(setRender('profile/switch-subscription-plan'), dashboard.getSwitchAccountPage)
	   .post(dashboard.switchSubscriptionPlan);   


};
