'use strict';

// middleware
// var secrets         = require('../config/secrets');
var setRender   = require('middleware-responder').setRender,
setRedirect     = require('middleware-responder').setRedirect,
isAuthenticated = require('../middleware/auth').isAuthenticated,
isUnauthenticated   = require('../middleware/auth').isUnauthenticated;


//controllers
var search      = require('../controllers/search-controller');


module.exports = function (app, passport) {

  // app.post('/domain-search', 
  //   setRedirect({auth: '/search-results'}),
  //   isUnauthenticated,
  //   setRender('search-results'),    
  //   search.fetch
  // );

  app.route('/search-results')
     .all(setRedirect({ auth: '/search-results', failture: '/search-results' }))
     .all(isUnauthenticated)
     .get(setRender('search-results'), search.getSearchResults);
     // .post(search.fetch);
  // app.get('/search-results'
  // 	isUnauthenticated,
  // 	setRender('search-results')    
  // 	search.fetch
  // 	);

  
//   app.post('/domain-book', {
  	
//   }
//   	);



};