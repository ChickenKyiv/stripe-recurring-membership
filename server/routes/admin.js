'use strict';

// middleware
var secrets           = require('./config/secrets');

module.exports    = function (app, passport) {


	//user-list
	// list of active clients with : email, domain name, plan type (quarterly/yearly), expiration date, [log in as client] button.

	//users-non-free-plan

	//switch user
	// the [log in as client] button allows me to change the user email and edit subscription (quarterly <-> yearly). 

	// refund user & give free 'credit' to user (only if it cannot be done directly via Stripe)?
	
	// list of non-completed purchases (this is what you mentioned above). The people who entered their email but didn't complete their purchase.
	
	// edit price for quarterly and yearly plan



};