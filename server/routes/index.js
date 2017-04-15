'use strict';

var secrets    = require('./config/secrets');

module.exports = function (app, passport) {

  app.get('/stripe-plans', function(req, res, next){

    var User  = require('../models/user'),
	    plans = User.listPlans();
	    

  });



};