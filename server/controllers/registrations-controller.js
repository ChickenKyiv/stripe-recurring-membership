'use strict';

var async      = require('async');
var crypto     = require('crypto');
var passport   = require('passport');
var User       = require('../models/user');


// Show Registration Page

// exports.getSignup = function(req, res){

//   var form = {},
//   error = null,
//   formFlash = req.flash('form'),
//   errorFlash = req.flash('error');

//   if (formFlash.length) {
//     form.email = formFlash[0].email;
//   }
//   if (errorFlash.length) {
//     error = errorFlash[0];
//   }
//   res.render('signup', {form: form, error: error});

// };

// Show Registration Page
exports.getSignup = function(req, res){

  var form       = {},
      error      = null,
      formFlash  = req.flash('form'),
      errorFlash = req.flash('error');



  if (formFlash.length) {
    form.email = formFlash[0].email;
  }

  if (errorFlash.length) {
    error = errorFlash[0];
  }
  
  const renderObject = {
    form : form, 
    error: error,
    //email
    placeholder: 'your existing email (gmail, hotmail, yahoo...)'
      // messages: req.flash('messages')
    };
    res.render(req.render, renderObject);  

};

// this is a clean version of sign up. Can be used later
exports.postSignup = function(req, res, next){

  req.assert('email', 'Please sign up with a valid email.').isEmail();
  req.assert('password', 'Password must be at least 6 characters long').len(6);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    req.flash('form', {
      email: req.body.email
    });
    return res.redirect('/signup');
  }

  console.log( req.body );

  // calls next middleware to authenticate with passport
  passport.authenticate('signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
    failureFlash : true
  })(req, res, next);
  
};

//@TODO rename this method later
exports.postSignup2 = function(req, res, next){

  req.assert('email',    'Please sign up with a valid email.').isEmail();
  req.assert('password', 'Password must be at least 6 characters long').notEmpty().len(6);
 
  req.assert('confirm',  'Confirm password must be at least 6 characters long').notEmpty().len(6);
  req.assert('confirm',  'Password and confirm password fields must match').equals(req.body.password);

  req.assert('domain',   'Please fill a domain name').notEmpty();

  var errors = req.validationErrors();

  // console.log( req.body );
  // console.log( errors );

  if (errors) {

    req.flash('errors', errors);
    req.flash('form', {
      email  : req.body.email,
      domain : req.body.domain      
    });
    
    return res.redirect(req.redirect.failure);
  } 
 


  // calls next middleware to authenticate with passport
  // this middleware can be found in /server/middleware/passport.js
  passport.authenticate('signup2', {
    successRedirect: req.redirect.success,
    // successRedirect: '/signup2-1',
    failureRedirect: req.redirect.failure,
    // failureRedirect: '/signup2',
    failureFlash : true
  })(req, res, next);


  // passport.authenticate('signup2', {
  //   successRedirect: '/dashboard',
  //   failureRedirect: '/signup2',
  //   failureFlash : true
  // })(req, res, next);
  
};

//@TODO remove later
exports.postSignupFirstTime = function(req, res, next){



  // !important - check if this email was registered before. 
  // But take less attention, than to registration with purchase.

  //if fields, that we've posted to this method don't apply to our rules - we need to do something.
  // maybe return error or something like it  


  req.assert('email',    'Please sign up with a valid email.').isEmail();

  // req.assert('password', 'Password must be at least 6 characters long').notEmpty().len(6);

  // req.assert('confirm', 'Confirm password must be at least 6 characters long').notEmpty().len(6);
  // req.assert('confirm', 'Passwords must match').equals(req.body.password);

  req.assert('domain',   'Please fill a domain name').notEmpty();

  var errors = req.validationErrors();

  // console.log( 'submit' );

  console.log( req.body );
  console.log( errors );

  // var plans  = User.getPlans();
  // console.log(plans);




  // if (errors) {
  //   req.flash('errors', errors);
  //   req.flash('form', {
  //     email  : req.body.email,
  //     domain : req.body.domain
  //   });
  //   return res.redirect('/signup2');

  // } 
  // else {
  //   req.flash('info', 'zaebok');
  // }

  // calls next middleware to authenticate with passport
  // this middleware can be found in /server/middleware/passport.js
  // passport.authenticate('signup2', {
  //   successRedirect: '/dashboard',
  //   failureRedirect: '/signup2',
  //   failureFlash : true
  // })(req, res, next);
  
};


// @TODO create controller for WHOIS settings or rename and use getProfile.

//prev version
exports.getWhoisForm2 = function(req, res, next){


  // <strong>
  // </strong>
  // <div class="toast-message"></div>
  //                     </div>

  // @TODO - must be registered
  var message = { msg: {
                      title : "Congratulations! Your email has been created.", 
                      body  : "Please wait until your domain comes online (usually just a few minutes, but sometimes up to a couple hours)"
                    } };


  var form  = {},
      error = null,
      formFlash  = req.flash('form'),
      errorFlash = req.flash('error');

  if (formFlash.length) {
    form.email = formFlash[0].email;
  }
  
  if (errorFlash.length) {
    error = errorFlash[0];
  }
  
  const renderObject = {
    user: req.user, 
    form: form, 
    error: error, 

      // messages: req.flash('messages')
  };
  res.render(req.render, renderObject);

  
};

//signup/whois-step
exports.getWhoisForm = function(req, res, next){

  var form       = {},
      error      = null,
      formFlash  = req.flash('form'),
      // plans      = '', // get plans()
      errorFlash = req.flash('error');

  if (formFlash.length) {
    form.email = formFlash[0].email;
  }

  if (errorFlash.length) {
    error = errorFlash[0];
  }

  const renderObject = {
      user: req.user,
    form: form,
    error: error,
    // plans: plans
      // messages: req.flash('messages')
  };
  res.render(req.render, renderObject);

  
};

exports.postWhois2 = function(req, res, next){

  // req.assert('email',    'Please sign up with a valid email.').isEmail();
  // req.assert('password', 'Password must be at least 6 characters long').notEmpty().len(6);

  // req.assert('confirm', 'Confirm password must be at least 6 characters long').notEmpty().len(6);
  // req.assert('confirm', 'Passwords must match').equals(req.body.password);

  req.assert('domain',       'Please fill a domain name').notEmpty();

  // @TODO get email value from logged in user or put email field to hidden field
  req.assert('email',        'Please sign up with a valid email.').isEmail();

  req.assert('first_name',   'First Name field is required').notEmpty();
  req.assert('last_name',    'Last Name field is required').notEmpty();
  req.assert('company_name', 'Company Name field is required').notEmpty();
  req.assert('address',      'Address field is required').notEmpty();
  req.assert('zip',          'Postcode field is required').notEmpty();
  req.assert('city',         'City is required').notEmpty();
  req.assert('state',        'State field is required').notEmpty();
  req.assert('country',      'Country field is required').notEmpty();
  req.assert('phone',        'Phone field is required').notEmpty();

  var errors = req.validationErrors();

  // DomainName  String  70  Yes Domain name to register
  // Years Number  2 Yes Number of years to register
  // Default Value: 2

  // AddFreeWhoisguard String  10  No  Adds free WhoisGuard for the domain
  // Default Value: no
  // WGEnabled String  10  No  Enables free WhoisGuard for the domain 
  // Default Value: no

  //check whois checkbox
  //output( req.body.whois-flag )
  // var flag = req.body.whois-flag;
  var data = {
    DomainName : domain,
    Years      : years, //by default we need to set 1 value
    AddFreeWhoisguard : flag, 
    WGEnabled : flag,
  };

  // RegistrantFirstName String  255 Yes First name of the Registrant user
  // RegistrantLastName  String  255 Yes Second name of the Registrant user
  // RegistrantAddress1  String  255 Yes Address1 of the Registrant user

  // RegistrantCity  String  50  Yes City of the Registrant user
  // RegistrantStateProvince String  50  Yes State/Province of the Registrant user

  // RegistrantPostalCode  String  50  Yes PostalCode of the Registrant user
  // RegistrantCountry String  50  Yes Country of the Registrant user

  // RegistrantPhone String  50  Yes Phone number in the format +NNN.NNNNNNNNNN

  // RegistrantEmailAddress  String  255 Yes Email address of the Registrant user


  var registrantData = {
    RegistrantFirstName : '',
    RegistrantLastName  : '',
    RegistrantAddress1  : '' ,         

    RegistrantCity      : '',
    RegistrantStateProvince : '',

    RegistrantPostalCode: '' ,  
    RegistrantCountry   : '',

    RegistrantPhone     : '',

    RegistrantEmailAddress : ''
  };


  //   TechFirstName String  255 Yes First name of the Tech user
  // TechLastName  String  255 Yes Second name of the Tech user
  // TechAddress1  String  255 Yes Address1 of the Tech user

  // TechCity  String  50  Yes City of the Tech user
  // TechStateProvince String  50  Yes State/Province of the Tech user

  // TechPostalCode  String  50  Yes PostalCode of the Tech user
  // TechCountry String  50  Yes Country of the Tech user
  // TechPhone String  50  Yes Phone number in the format +NNN.NNNNNNNNNN

  // TechEmailAddress  String  255 Yes Email address of the Tech user

  var techPersonData = {
    TechFirstName : '',
    TechLastName  : '',
    TechAddress1  : '',

    TechCity      : '',
    TechStateProvince : '',

    TechPostalCode : '',
    TechCountry    : '',
    TechPhone      : '',

    TechEmailAddress : ''
  };

  //   AdminFirstName  String  255 Yes First name of the Admin user
  // AdminLastName String  255 Yes Second name of the Admin user
  // AdminAddress1 String  255 Yes Address1 of the Admin user

  // AdminCity String  50  Yes City of the Admin user
  // AdminStateProvince  String  50  Yes State/Province of the Admin user

  // AdminPostalCode String  50  Yes PostalCode of the Admin user
  // AdminCountry  String  50  Yes Country of the Admin user
  // AdminPhone  String  50  Yes Phone number in the format +NNN.NNNNNNNNNN

  // AdminEmailAddress String  255 Yes Email address of the Admin user
  var adminData      = {
    AdminFirstName:'',
    AdminLastName:'',
    AdminAddress1:'',

    AdminCity:'',
    AdminStateProvince:'',

    AdminPostalCode:'',
    AdminCountry:'',
    AdminPhone:'',

    AdminEmailAddress:'',
  };

  // AuxBillingFirstName String  255 Yes First name of the AuxBilling user
  // AuxBillingLastName  String  255 Yes Second name of the AuxBilling user
  // AuxBillingAddress1  String  255 Yes Address1 of the AuxBilling user

  // AuxBillingCity  String  50  Yes City of the AuxBilling user
  // AuxBillingStateProvince String  50  Yes State/Province of the AuxBilling user

  // AuxBillingPostalCode  String  50  Yes PostalCode of the AuxBilling user
  // AuxBillingCountry String  50  Yes Country of the AuxBilling user
  // AuxBillingPhone String  50  Yes Phone number in the format +NNN.NNNNNNNNNN

  // AuxBillingEmailAddress  String  255 Yes Email address of the AuxBilling user

  var auxData = {
    AuxBillingFirstName:'',
    AuxBillingLastName:'',
    AuxBillingAddress1:'',

    AuxBillingCity:'',
    AuxBillingStateProvince:'',

    AuxBillingPostalCode:'',
    AuxBillingCountry:'',
    AuxBillingPhone:'',

    AuxBillingEmailAddress:'',

  };


    // req.body.first_name       

    // req.body.last_name  

    // req.body.company_name 

    // req.body.address 

    // req.body.zip 

    // req.body.city 

    // req.body.state 

    // req.body.country 

    // req.body.phone 

    // req.body.fax 


  // console.log( 'submit' );

  // console.log( req.body );
  // console.log( errors );

  // var plans  = User.getPlans();
  // console.log(plans);

  // var userDataFields = {
  //   profile: {
  //     email :
  //     domain:

  //     first_name:
  //     last_name:
  //     company_name:
  //     address:
  //     zip:
  //     city:
  //     state:
  //     country:
  //     phone:
  //     fax:
  //   }
  // };

// Call Namecheap create.domain method and pass all data that we have for domain registration
// Response
// Domain  Domain name that you are trying to register.
// Registered  Possible responses: True, False. Indicates whether the domain was registered.
// ChargedAmount Total amount charged for registration.
// DomainID  Unique integer value that represents the domain.
// OrderID Unique integer value that represents the order.
// TransactionID Unique integer value that represents the transaction.




  if (errors) {
    req.flash('errors', errors);

    req.flash('form', userDataFields);

    // req.flash('form', {
    //   // email  : req.body.email,
    //   // domain : req.body.domain

    // });

    return res.redirect('/signup2');

  } 
  ;


  // calls next middleware to authenticate with passport
  // this middleware can be found in /server/middleware/passport.js
  // passport.authenticate('signup2', {
  //   successRedirect: '/signup2-1',
  //   failureRedirect: '/signup2',
  //   failureFlash : true
  // })(req, res, next);

  
};


// Updates generic profile information

exports.postWhois = function(req, res, next){

  req.assert('first_name',   'First Name is required').notEmpty(); 
  req.assert('last_name',    'Last Name is required').notEmpty();  
  req.assert('company_name', 'Company Name is required').notEmpty();
  req.assert('address1',     'Address is required').notEmpty();
  req.assert('zip',          'Zip is required').notEmpty();
  req.assert('city',         'City is required').notEmpty();
  req.assert('state',        'State is required').notEmpty();
  req.assert('phone',        'Phone Number is required').notEmpty();


  var userAdditionalData = {

    first_name : req.body.first_name || '',

    last_name  : req.body.last_name  || '',

    company_name : req.body.company_name || '', 

    address : req.body.address1 || '',

    zip : req.body.zip          || '',

    city : req.body.city        || '',

    state : req.body.state      || '',

    country : req.body.country  || '', 

    phone : req.body.phone      || '',

    fax : req.body.fax          || '',

    //@TODO check Do we need to pass this values too?
    plan         : req.user.profile.plan,
    forwardEmail :  req.user.profile.forwardEmail,
    domain       :  req.user.profile.domain,

  };

  // console.log(userAdditionalData);
// 
  var errors = req.validationErrors();

  if (errors) {

    req.flash('errors', errors);
    return res.redirect(req.redirect.failure);
  }


  var query  = { _id : req.user.id };

  var update = {$set:{ 
        
        profile:  userAdditionalData 

      }} ;


  // process.exit();


  User.findOneAndUpdate( query, update, {new: true}, function(err, user){
    if (err) return next(err);

    // console.log(user);


    req.flash('success', { msg: 'Profile information updated.' });

    res.redirect(req.redirect.success);



  });


};
