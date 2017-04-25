'use strict';

var express    = require('express');
var swig       = require('swig');
var subdomainOffset = process.env.SUBDOMAIN_OFFSET || 0;
var secrets    = require('./config/secrets');
var path       = require('path');
var favicon    = require('serve-favicon');
var logger     = require('morgan');
var cookieParser = require('cookie-parser');
var session    = require('express-session');
var MongoStore = require('connect-mongo')({ session: session });
var mongoose   = require('mongoose');
var passport   = require('passport');
var bodyParser = require('body-parser');
var compress   = require('compression')();
var lodash     = require('lodash');

// require('dotenv').load();

// var Authentication = require('./authentication');
var expressValidator = require('express-validator');
var errorHandler     = require('./middleware/error');
var viewHelper       = require('./middleware/view-helper');
var flash            = require('express-flash');
var cors             = require('cors');
var corsOptions      = { origin: '*' };
var staticDir;


// one routes version
// var routes = require('./routes/routes');
// var allRoutes = require('./routes');
// var allRoutes = require('./routes/index');

var index     = require('./routes/index');
var search = require('./routes/search');

var forgot    = require('./routes/forgot');
// var stripeHooks = require('./routes/webhooks');
var registration = require('./routes/registration');
var login =  require('./routes/login');

// @TODO maybe rename to profile?
// var users = require('./routes/user');
// var profile = require('./routes/profile');

// var dashboard = require('./routes/dashboard');




// setup db
mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

var corsOptions = { origin: '*' };

// express setup
var app = express();

if (app.get('env') === 'production') {
  app.locals.production = true;
  swig.setDefaults({ cache: 'memory' });
  staticDir = path.join(__dirname + '/../public');

} else {

  app.locals.production = false;
  swig.setDefaults({ cache: false });
  staticDir = path.join(__dirname + '/../public');

}

// This is where all the magic happens!
app.engine('html', swig.renderFile);
app.set('views',   path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.locals._ = lodash;
//@TODO change this


if (app.get('env') === 'production') {
  app.locals.stripePubKey = secrets.stripeNextVersion.public.stripe.livePublishableKey;
} else {
  //dev
  app.locals.stripePubKey = secrets.stripeNextVersion.public.stripe.testPublishableKey;
}


app.use(favicon(path.join(__dirname + '/../public/favicon.ico')));
app.use(logger('dev'));

app.use(compress);
app.use(bodyParser());
app.use(expressValidator());
app.use(cookieParser());

app.use(express.static(staticDir));
if(app.get('env') !== 'production'){
  app.use('/styles', express.static(__dirname + '/../.tmp/styles'));
  // app.use('/', routes.styleguide);
}

app.use(session({
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60 * 1000 // 1 minute
  },
  secret: secrets.sessionSecret,
  store: new MongoStore({
    url: secrets.db,
    auto_reconnect: true
  })
}));

// setup passport authentication
app.use(passport.initialize());
app.use(passport.session());

// @TODO fix it
// app.use(passport.authenticate('remember-me'));


// other
app.use(flash());
app.use(cors(corsOptions));

//Passport extension enable Login/Sign Up/Forgot functionality
var passportMiddleware = require('./middleware/passport');
passportMiddleware(passport);

// app.use(passport.authenticate('remember-me'));

// setup view helper
app.use(viewHelper);


// setup routes
index(app, passport);
search(app, passport);
forgot(app, passport);
// stripeHooks(app, passport);
registration(app, passport);
login(app, passport);
// users(app, passport);
// dashboard(app, passport);

/// catch 404 and forwarding to error handler
app.use(errorHandler.notFound);

/// error handlers
if (app.get('env') === 'development') {
  app.use(errorHandler.development);
} else {
  app.use(errorHandler.production);
}

module.exports = app;
