'use strict';

// middleware
var 
isAuthenticated   = require('../middleware/auth').isAuthenticated,
isUnauthenticated = require('../middleware/auth').isUnauthenticated,
setRender         = require('middleware-responder').setRender,
setRedirect       = require('middleware-responder').setRedirect,

//controllers
var sessions      = require('../controllers/sessions-controller');

module.exports    = function (app, passport) {

  // sessions
    app.routes('/login')
       .all(setRedirect({auth: '/dashboard', success: '/dashboard', failure: '/'}))
       .all(isUnauthenticated)
       .post(sessions.postLogin);

	app.routes('/logout')
     .all(setRedirect({auth: '/', success: '/'}))
     .all(isAuthenticated)     
     .get(sessions.logout);

  // router.post('/login',
  //   setRedirect({auth: '/dashboard', success: '/dashboard', failure: '/'}),
  //   isUnauthenticated,
  //   sessions.postLogin
  // );

  // router.get('/logout',
  //   setRedirect({auth: '/', success: '/'}),
  //   isAuthenticated,
  //   sessions.logout
  // );
};