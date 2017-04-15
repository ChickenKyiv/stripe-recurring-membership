'use strict';

var secrets    = require('./config/secrets');

module.exports = function (app, passport) {

  app.post('/domain-search', {

  } 
    // setRedirect({auth: '/dashboard'}),
    isUnauthenticated,
    setRender('search-results'),    
    search.fetch
  );

  app.post('/domain-book', {
  	
  }
  	);



};