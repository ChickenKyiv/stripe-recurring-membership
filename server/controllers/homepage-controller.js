'use strict';

// middleware
var 
isAuthenticated   = require('../middleware/auth').isAuthenticated,
isUnauthenticated = require('../middleware/auth').isUnauthenticated,
setRender         = require('middleware-responder').setRender,
setRedirect       = require('middleware-responder').setRedirect;

// controllers
var main      = require('../controllers/main-controller');

module.exports = function (app, passport) {


// homepage
  app.route('/')
     .all(setRedirect({auth: '/dashboard'}))
     .all(isUnauthenticated)     
     .get(setRender('index'), main.getHome); 

};