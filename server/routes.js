'use strict';

// middleware
var 
// StripeWebhook = require('stripe-webhook-middleware'),

isAuthenticated   = require('./middleware/auth').isAuthenticated,
isUnauthenticated = require('./middleware/auth').isUnauthenticated,
setRender         = require('middleware-responder').setRender,
setRedirect       = require('middleware-responder').setRedirect,
// stripeEvents      = require('./middleware/stripe-events'),
secrets           = require('./config/secrets');

// controllers
var users     = require('./controllers/users-controller'),
main          = require('./controllers/main-controller'),
dashboard     = require('./controllers/dashboard-controller'),
passwords     = require('./controllers/passwords-controller'),
registrations = require('./controllers/registrations-controller'),



sessions      = require('./controllers/sessions-controller');


//@TODO redo this. 

// var stripeWebhook = new StripeWebhook({
//   stripeApiKey: secrets.stripeNextVersion.private.stripe.testSecretKey,
//   respond: true
// });



module.exports = function (app, passport) {

  app.get('/ping', function(req, res, next){
    res.send('pong!');
  });

  //testing custom mail server
  app.get('/mail-test', function(req, res, next){

    
    const nodemailer = require('nodemailer');


    // create reusable transporter object using the default SMTP transport
    // let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'gmail.user@gmail.com',
    //         pass: 'yourpass'
    //     }
    // });

    let transporter = nodemailer.createTransport( secrets.emailServer );

    console.log( transporter );

    // verify connection configuration
    // transporter.verify(function(error, success) {
    //    if (error) {
    //         console.log(error);
    //    } else {
    //         console.log('Server is ready to take our messages');
    //    }
    // });

    // setup email data with unicode symbols
    let mailData = {
        from   : '"EasyMail support" <admin@easymail.io>', // sender address
        to     : 'Arthur <arthur.tkachenko.netweight@gmail.com>', // list of receivers
        subject: 'Hello ✔', // Subject line
        text   : 'Hello world ?', // plain text body
        html   : '<b>Hello world ?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(info);

        console.log('Message %s sent: %s', info.messageId, info.response);
    });


  });

  app.get('/mail-test-html', function(req, res, next){

    const nodemailer  = require('nodemailer');
    const hbs    = require('nodemailer-express-handlebars');
    // var EmailTemplate = require('email-templates').EmailTemplate;
    // https://community.nodemailer.com/2-0-0-beta/templating/

    var options = {
        viewPath: 'views/mails', //Path to email template folder
        // extName : '.handlebars' //extendtion of email template
    }

    let transporter   = nodemailer.createTransport( secrets.emailServer );

    transporter.use('compile', hbs (options));

    var host  = req.get('host');
    var host2 = req.headers.host;
    var expireLink = "xxxxxxxxxxxx";
    var from  = '"EasyMail support" <admin@easymail.io>';

    var params = {
      host: host,
      link: expireLink,
      // from: from
    };

    // setup email data with unicode symbols
    let mailData = {
        from   : from, // sender address
        to     : 'Arthur <arthur.tkachenko.netweight@gmail.com>', // list of receivers
        // to: user.local.email,
        subject: 'Hello ✔',              // Subject line
        text   : 'Hello world ?',        // plain text body
        html   : '<b>Hello world ?</b>', // html body

        template: 'forgot', //Name email file template
        context: params

        // context:{hostUrl: req.headers.host,
        // customeName: user.info.firstname + ' ' + user.info.lastname,
        // resetUrl: req.headers.host + '/users/recover/' + token,
        // resetCode: token}

    };

   

    
    // var send = transporter.templateSender(new EmailTemplate('views/mails'));

    // send mail with defined transport object
    transporter.sendMail(mailData, (error, response) => {

      if (err) {
        res.send('Error send email, please contact administrator to best support.');
      }

      res.send('Email send successed to you email' + response.messageId + '. ' + response.response);
      done(err, 'done');

        // if (error) {
        //   return console.log(error);
        // }
        // console.log(response);

        // console.log('Message %s sent: %s', response.messageId, response.response);



    });


  });



  // homepage and dashboard
  app.get('/',
    setRedirect({auth: '/dashboard'}),
    isUnauthenticated,
    setRender('index'),
    main.getHome
  );

  // sessions
  app.post('/login',
    setRedirect({auth: '/dashboard', success: '/dashboard', failure: '/'}),
    isUnauthenticated,
    sessions.postLogin
  );

  app.get('/logout',
    setRedirect({auth: '/', success: '/'}),
    isAuthenticated,
    sessions.logout
  );

  // registrations
  // app.get('/signup',
  //   setRedirect({auth: '/dashboard'}),
  //   isUnauthenticated,
  //   setRender('signup'),
  //   registrations.getSignup
  // );

  // app.post('/signup',
  //   setRedirect({auth: '/dashboard', success: '/dashboard', failure: '/signup2'}),
  //   isUnauthenticated,
  //   registrations.postSignup
  // );

//------------
  app.get('/signup2',
    setRedirect({auth: '/dashboard'}),
    isUnauthenticated,
    setRender('signup2'),
    registrations.getSignup2
  );



  app.post('/signup2',
    setRedirect({auth: '/dashboard', success: '/signup2-1', failure: '/signup2'}),
    // setRedirect({auth: '/dashboard', success: '/dashboard', failure: '/signup2'}),
    isUnauthenticated,
    registrations.postSignup2
  );

//user registration before purchase
  app.post('/signupshort',
    setRedirect({auth: '/dashboard', success: '/dashboard', failure: '/signup2'}),
    isUnauthenticated,
    registrations.postSignupFirstTime
  );


  app.get('/signup2-1',
    setRedirect({auth: '/dashboard'}),
    isUnauthenticated,
    setRender('signup2-1'),
    registrations.getSignup2
  );


//---------------


  // forgot password
  app.get('/forgot',
    setRedirect({auth: '/dashboard'}),
    isUnauthenticated,
    setRender('forgot'),
    passwords.getForgotPassword
  );

  app.post('/forgot',
    setRedirect({auth: '/dashboard', success: '/forgot', failure: '/forgot'}),
    isUnauthenticated,
    passwords.postForgotPassword
  );


  // reset tokens
  app.get('/reset/:token',
    setRedirect({auth: '/dashboard', failure: '/forgot'}),
    isUnauthenticated,
    setRender('reset'),
    passwords.getToken
  );

  app.post('/reset/:token',
    setRedirect({auth: '/dashboard', success: '/dashboard', failure: 'back'}),
    isUnauthenticated,
    passwords.postToken
  );


  app.get('/dashboard',
    setRender('dashboard/index'),
    setRedirect({auth: '/'}),
    isAuthenticated,
    dashboard.getDefault
  );

  app.get('/billing',
    setRender('dashboard/billing'),
    setRedirect({auth: '/'}),
    isAuthenticated,
    dashboard.getBilling
  );

  app.get('/profile',
    setRender('dashboard/profile'),
    setRedirect({auth: '/'}),
    isAuthenticated,
    dashboard.getProfile
  );


  app.get('/profile',
    setRender('dashboard/whois-settings'),
    setRedirect({auth: '/'}),
    isAuthenticated,
    dashboard.getProfile
  );




  // user api stuff
  app.post('/user',
    setRedirect({auth: '/', success: '/profile', failure: '/profile'}),
    isAuthenticated,
    users.postProfile
  );

  app.post('/user/billing',
    setRedirect({auth: '/', success: '/billing', failure: '/billing'}),
    isAuthenticated,
    users.postBilling
  );

  app.post('/user/plan',
    setRedirect({auth: '/', success: '/billing', failure: '/billing'}),
    isAuthenticated,
    users.postPlan
  );

  // change password
  app.post('/user/password',
    setRedirect({auth: '/', success: '/profile', failure: '/profile'}),
    isAuthenticated,
    passwords.postNewPassword
  );



  //cancel subscriptions
  // working together with /user/delete router
  app.get('/user/subscription/cancel',
    setRender('dashboard/profile'),
    setRedirect({auth: '/'}),
    isAuthenticated,
    dashboard.getCancelMyAccountAction
  );

  app.post('/user/delete',
    setRedirect({auth: '/', success: '/'}),
    isAuthenticated,
    users.deleteAccount
  );


  app.get('/user/profile/forward-email',
    setRender('dashboard/forward-email'),
    setRedirect({auth: '/'}),
    isAuthenticated,
    dashboard.updateForwardEmailAction
  );

  app.post('/user/update-forward-email',
    setRedirect({auth: '/', success: '/'}),
    isAuthenticated,
    users.postForwardEmailAction
  );
  
  // // use this url to receive stripe webhook events
  // app.post('/stripe/events',
  //   stripeWebhook.middleware,
  //   stripeEvents
  // );



};