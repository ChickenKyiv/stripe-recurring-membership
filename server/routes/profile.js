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
     .get(setRender('dashboard/index'), dashboard.getDefault); //@TODO not finished functionality

  //@TODO check and compare this routes with 3rd registration step   
  // app.route('/billing')
  //    .all(setRedirect({auth: '/'}))
  //    .all(isAuthenticated)     
  //    .get(setRender('dashboard/billing'), dashboard.getBilling)
  //    .post(dashboard.postBilling); // this must be replaced by post user/plan

  app.route('/profile')
     .all(setRedirect({auth: '/', success: '/profile', failure: '/profile'}))
     .all(isAuthenticated)     
     .get(setRender('profile/index'), dashboard.getProfile); //@TODO move to different controller  
     // .post(dashboard.postProfile);

  app.route('/profile/update')
     .all(setRedirect({auth: '/', success: '/profile/update', failure: '/profile/update'})) //@TODO change success value
     .all(isAuthenticated)     
     .get(setRender('profile/edit-details'), dashboard.getProfileForm) //@TODO move to different controller  
     .post(dashboard.postProfile);     

  //switch plan
  // @TODO change this. right now all stuff included on dashboard billing
  app.route('/subscription/switch/:subscription_id')
     .all(setRedirect({auth: '/', success: '/'})) //@TODO change redirect object
     .all(isAuthenticated)  
     .get(setRender('profile/switch-subscription-plan'), dashboard.getSwitchAccountPage)
     .post(dashboard.switchSubscriptionPlan);   
     

    //@TODO i think this is not finished   
  app.route('/update-card')
     .all(setRedirect({auth: '/'}))
     .all(isAuthenticated)
     .get(setRender('profile/update-card'), dashboard.getUpdateCardPage);
     // .post(dashboard.postUpdateCard); //@TODO finish this part
     // .get(setRender('profile/update-card'), dashboard.getBilling);  

};
