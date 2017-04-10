'use strict';

var secrets = require('../config/secrets');
var lodash  = require('lodash');

// app.locals._ = lodash;
// //@TODO change this
// app.locals.stripePubKey = secrets.stripeNextVersion.public.stripe.testPublishableKey;

// console.log( secrets.stripeNextVersion.public.stripe.testPublishableKey );


// secrets.stripeNextVersion.public.stripe .testPublishableKey .livePublishableKey 
// secrets.stripeNextVersion.public.plans 
// secrets.stripeNextVersion.private.stripe .testSecretKey .liveSecretKey


module.exports = {

	development: function(req, res, next) {
	    
	   //  res.locals.path = req.path;
  		// res.locals.googleAnalytics = secrets.googleAnalytics;
	    next();
	  },

};