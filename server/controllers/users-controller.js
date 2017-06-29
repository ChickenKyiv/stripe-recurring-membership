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
// exports.updateForwardEmail = function (req, res, next){


//   // console.log( req.route.path )
//   const renderObject = {
//     user: req.user, 


//     currentEmail: req.user.profile.forwardEmail || 'Not specified', 
    
//    


//     sweetAlertShow: flag || false,
//   };


// };




// exports.postForwardEmail = function (req, res, next){



// 
//       // updateForwardEmailConfirmation(); //@TODO send confirmation message

//    

// };