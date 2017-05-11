'use strict';

// middleware
var 
isAuthenticated   = require('../middleware/auth').isAuthenticated,
isUnauthenticated = require('../middleware/auth').isUnauthenticated,
setRender         = require('middleware-responder').setRender,
setRedirect       = require('middleware-responder').setRedirect;

// controllers
var users     = require('../controllers/users-controller');
var passwords     = require('../controllers/passwords-controller');

//@TODO move this function to profile for better logic
module.exports = function (app, passport) {
	
	// app.route('/user') //@TODO check this route
	//    .all(setRedirect({auth: '/', success: '/profile', failure: '/profile'}))
	//    .all(isAuthenticated)	   
	//    .post(users.postProfile); //@TODO remove this method from user controller 


	// not removeb because of future improvements. but right now it's duplicated on dashboard controller - 'switch' feature
	// app.route('/user/plan')
	//    .all(setRedirect({auth: '/', success: '/billing', failure: '/billing'}))
	//    .all(isAuthenticated)	   
	//    .post(users.postPlan);

 
	// change password - maybe move this to profile or passwords routes.
	app.route('/user/password')
	   .all(setRedirect({auth: '/', success: '/dashboard', failure: '/dashboard'}))
	   .all(isAuthenticated)
	   .get(setRender('profile/change-password'), passwords.getPasswordPage)	   
	   .post(passwords.postNewPassword); //@TODO move to profile or to dashboard routers




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
	   .all(setRedirect({auth: '/', success: '/', failure: '/user/forward-email'})) //@TODO change redirect object
	   .all(isAuthenticated)	
	   .get(setRender('dashboard/forward-email'), users.updateForwardEmail)
	   .post(users.postForwardEmail); ///user/update-forward-email




};