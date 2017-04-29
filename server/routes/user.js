'use strict';

// middleware
var 
isAuthenticated   = require('../middleware/auth').isAuthenticated,
isUnauthenticated = require('../middleware/auth').isUnauthenticated,
setRender         = require('middleware-responder').setRender,
setRedirect       = require('middleware-responder').setRedirect;

// controllers
var users     = require('../controllers/users-controller');

// var dashboard     = require('../controllers/dashboard-controller');
// passwords     = require('../controllers/passwords-controller');


module.exports = function (app, passport) {
	
	// app.route('/user') //@TODO check this route
	//    .all(setRedirect({auth: '/', success: '/profile', failure: '/profile'}))
	//    .all(isAuthenticated)	   
	//    .post(users.postProfile); 

	app.route('/user/billing')
	   .all(setRedirect({auth: '/', success: '/billing', failure: '/billing'}))
	   .all(isAuthenticated)	   
	   .post(users.postBilling);

	app.route('/user/plan')
	   .all(setRedirect({auth: '/', success: '/billing', failure: '/billing'}))
	   .all(isAuthenticated)	   
	   .post(users.postPlan);


	// change password
	app.route('/user/password')
	   .all(setRedirect({auth: '/', success: '/billing', failure: '/billing'}))
	   .all(isAuthenticated)	   
	   .post(users.postPlan);




	// cancel subscriptions
	// working together with /user/delete router
	app.route('/user/subscription/cancel')
	   .all(setRedirect({auth: '/'}))
	   .all(isAuthenticated)	   
	   .get(setRender('dashboard/profile'), users.getCancelMyAccountAction);	

	// delete
	app.route('/user/delete')
	   .all(setRedirect({auth: '/', success: '/'}))
	   .all(isAuthenticated)	   
	   .get(users.deleteAccount);	
	   

  app.route('/user/forward-email')
	   .all(setRedirect({auth: '/', success: '/'}))
	   .all(isAuthenticated)	
	   .get(setRender('dashboard/forward-email'), users.updateForwardEmailAction)
	   .post(users.postForwardEmailAction); ///user/update-forward-email




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


  // user api stuff





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
