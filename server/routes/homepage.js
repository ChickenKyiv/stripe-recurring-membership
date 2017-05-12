'use strict';

// middleware
// var secrets    = require('./config/secrets');
var setRender     = require('middleware-responder').setRender,
setRedirect       = require('middleware-responder').setRedirect,
isUnauthenticated = require('../middleware/auth').isUnauthenticated;

//controllers
var homepage      = require('../controllers/homepage-controller');
var test          = require('../controllers/test-controller');

module.exports = function (app, passport) {

  // app.get('/stripe-plans', function(req, res, next){

  //   var User  = require('../models/user'),
	 //    plans = User.listPlans();
	    

  // });

  app.route('/')
     .all(setRedirect({auth: '/dashboard', search: '/domain-search'}))
     .all(isUnauthenticated)
     .get(setRender('homepage'), homepage.getHome);


    app.route('/userlist')
     .all(setRedirect({auth: '/', search: '/'}))
     // .all(isUnauthenticated)
     .get(setRender('homepage'), test.getUsers);   

};