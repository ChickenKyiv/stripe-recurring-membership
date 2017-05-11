'use strict';

var User = require('../models/user');


// Removes account

exports.deleteAccount = function(req, res, next){

  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);

    console.log( user );

    // user.remove(function (err, user) {

    //   if (err) return next(err);

    //   user.cancelStripe(function(err){
    //     if (err) return next(err);

    //     req.logout();
    //     req.flash('info', { msg: 'Your account has been deleted.' });
    //     res.redirect(req.redirect.success);
    //   });

        // user.deleteDomain.
        

    // });

  });

};








exports.postPlan = function(req, res, next){

  var plan = req.body.plan;
  var stripeToken = null;

  if(plan){
    plan = plan.toLowerCase();
  }

  console.log( req.body );
  console.log( plan );
  console.log( req.user );
  console.log( req.user.stripe.plan );


    // req.first_name        
    // req.last_name      
    // req.company_name 
    // req.address 
    // req.zip 
    // req.city 
    // req.state 
    // req.country 
    // req.phone 
    // req.fax 


  // if(req.user.stripe.plan == plan){
  //   req.flash('info', {
  //     msg: 'The selected plan is the same as the current plan.'
  //   });
  //   return res.redirect(req.redirect.success);
  // }

  // stripeToken isset
  // if(req.body.stripeToken){
  //   stripeToken = req.body.stripeToken;
  // }

  // we don't need to handle this situation
  // if(!req.user.stripe.last4 && !req.body.stripeToken){
  //   req.flash('errors', {
  //     msg: 'Please add a card to your account before choosing a plan.'
  //   });
  //   return res.redirect(req.redirect.failure);
  // }

  User.findById(req.user.id, function(err, user) {

    if (err) return next(err);

    console.log( user );

    // user.setPlan(plan, stripeToken, function (err) {
    //   var msg;

    //   if (err) {
    //     if(err.code && err.code == 'card_declined'){
    //       msg = 'Your card was declined. Please provide a valid card.';
    //     } else if(err && err.message) {
    //       msg = err.message;
    //     } else {
    //       msg = 'An unexpected error occurred.';
    //     }

    //     req.flash('errors', {
    //      msg:  msg
    //    });
    //     return res.redirect(req.redirect.failure);
    //   }
    //   req.flash('success', { 
    //     msg: 'Plan has been updated.' 
    //   });
    //   res.redirect(req.redirect.success);
    // });

  });



  
};


///////////////


//@TODO finish and test
exports.getCancelMyAccountAction = function (req, res, next){

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
    title: 'user profile',
    user: req.user,
    form: form, 
    transactions: transactions,
    messages: req.flash('messages')
  };

  res.render(req.render, renderObject);

};



//@TODO finish and test
exports.updateForwardEmail = function (req, res, next){

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

  //flag variable responsible for showing
  var flag = true;

  // console.log( req.route.path )
  const renderObject = {
    user: req.user, 
    form: form, 
    error: error,

    //email
    email: req.user.email, //@TODO not sure if this is important to pass to view
    placeholder: 'New Email Address',

    currentEmail: req.user.profile.forwardEmail || 'Not specified', 
    
    confirmEmailPlaceholder: 'Confirm Email Address',

      // messages: req.flash('messages')

    route: 'forward-email', //@TODO fix up. Removed from layout right now
    sweetAlertShow: flag || false,
  };

  res.render(req.render, renderObject);

};


exports.postForwardEmail = function (req, res, next){

  // req.assert('email',    'Please use a valid email.').isEmail();
  // req.assert('confirm', 'Passwords must match').isEmail().equals(req.body.password);

  var errors = req.validationErrors();

  // console.log( req.body );
  // console.log( errors );

  console.log( req.body );
  // console.log( plan );
  console.log( req.user );
  console.log( req.user.id );
  
// // req.user.id
//   var query  = { _id: req.user.id };
//   var update = {$set:{ 
        
//         profile:  { forwardEmail :  } 

//       }} ;

//   User.findOneAndUpdate( query, update, {new: true}, function(err, user){
//     if (err) return next(err); 
//     //or  
//     // req.flash('errors', {
//     //        msg:  'We didn\'t update forward email setting'
//     // });
//     // return res.redirect(req.redirect.failure);

//     // console.log(user);

//       // updateForwardEmailConfirmation(); //@TODO send confirmation message

//     req.flash('success', { msg: 'Profile information updated.' });

//     res.redirect(req.redirect.success);

//   });

  // User.findOneAndUpdate({_id: req.user.id}, {$set:{profile:"Naomi"}}, {new: true}, 
  //   function(err, user){

  //     if(err){
  //         console.log("Something wrong when updating data!");

  //         req.flash('errors', {
  //          msg:  'We didn\'t update'
  //        });
  //         return res.redirect(req.redirect.failure);
  //     }

  //     console.log(user);




  // });





};




