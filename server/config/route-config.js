(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //

	//@TODO test this paths
	const homepage  = require('./routes/homepage');
	const search    = require('./routes/search');

	const forgot    = require('./routes/forgot');
	// const stripeHooks = require('./routes/webhooks');
	const registration = require('./routes/registration');
	const login     =  require('./routes/login');

	// @TODO maybe rename to profile?
	const users     = require('./routes/user');

	const profile   = require('./routes/profile');



    // *** register routes *** //  

	homepage(app, passport);
	search(app, passport);
	forgot(app, passport);
	// stripeHooks(app, passport);
	registration(app, passport);
	login(app, passport);
	users(app, passport);
	// dashboard(app, passport);
	profile(app, passport);


  };

})(module.exports);