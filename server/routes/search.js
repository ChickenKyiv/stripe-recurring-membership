'use strict';

var secrets         = require('./config/secrets');
var isAuthenticated = require('./middleware/auth').isAuthenticated,
isUnauthenticated   = require('./middleware/auth').isUnauthenticated;


module.exports = function (app, passport) {

  app.post('/domain-search', 
    setRedirect({auth: '/search-results'}),
    isUnauthenticated,
    setRender('search-results'),    
    search.fetch
  );

  // app.get('/search-results'
  // 	isUnauthenticated,
  // 	setRender('search-results')    
  // 	search.fetch
  // 	);

  
//   app.post('/domain-book', {
  	
//   }
//   	);



};