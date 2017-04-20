'use strict';

	// fetchCom
  // fetchNet
  // fetchMe

// namecheap.js
//related to namecheap API methods


module.exports = {

	fetchCom: function(req, res, next) {
		var ext = 'com';
    // var err = new Error('Not Found');

    // err.status = 404;
    	next();
	},

	fetchNet: function(req, res, next) {
		var ext = 'net';		
    // var err = new Error('Not Found');

    // err.status = 404;
    	next();
	},

    fetchMe: function(req, res, next) {
		var ext = 'me';    	
    // var err = new Error('Not Found');

    // err.status = 404;
    	next();
	},

}