'use strict';

// middleware
var 
isAuthenticated   = require('../middleware/auth').isAuthenticated,
isUnauthenticated = require('../middleware/auth').isUnauthenticated,
setRender         = require('middleware-responder').setRender,
setRedirect       = require('middleware-responder').setRedirect;

// controllers
// var users     = require('../controllers/users-controller');

// Register domain  (using namecheap “create domain” API call)


module.exports = function (app, passport) {
	
	// app.route('/user')
	//    .all(setRedirect({auth: '/', success: '/profile', failure: '/profile'}))
	//    .all(isAuthenticated)	   
	//    .post(users.postProfile);

};	   