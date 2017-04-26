'use strict';

// middleware
// var secrets    = require('./config/secrets');
var setRender     = require('middleware-responder').setRender,
setRedirect       = require('middleware-responder').setRedirect,
isUnauthenticated = require('../middleware/auth').isUnauthenticated;

//controllers
var main      = require('../controllers/main-controller');

module.exports = function (app, passport) {

  // app.get('/stripe-plans', function(req, res, next){

  //   var User  = require('../models/user'),
	 //    plans = User.listPlans();
	    

  // });

  app.route('/')
     .all(setRedirect({auth: '/dashboard', search: '/domain-search'}))
     .all(isUnauthenticated)
     .get(setRender('homepage'), main.getHome);



};