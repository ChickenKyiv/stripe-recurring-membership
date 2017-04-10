'use strict';

var User  = require('../models/user'),
    plans = User.getPlans();

exports.getDefault = function(req, res, next){

  var form = {},
  error = null,
  formFlash = req.flash('form'),
  errorFlash = req.flash('error');

  if (formFlash.length) {
    form.email = formFlash[0].email;
  }
  
  if (errorFlash.length) {
    error = errorFlash[0];
  }

  res.render(req.render, {
    user: req.user, 
    form: form, 
    error: error, 
    plans: plans
  });

};

exports.getBilling = function(req, res, next){

  var form       = {},
      error      = null,
      formFlash  = req.flash('form'),
      errorFlash = req.flash('error');

  if (formFlash.length) {
    form.email   = formFlash[0].email;
  }

  if (errorFlash.length) {
    error = errorFlash[0];
  }

  res.render(req.render, {
    user: req.user,
    form: form,
    error: error,
    plans: plans
  });

};

//dashboard/profile
exports.getProfile = function(req, res, next){

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

  res.render(req.render, {
    user: req.user,
    form: form,
    error: error,
    plans: plans
  });
  
};

// @TODO create controller for WHOIS settings or rename and use getProfile.

//prev version
exports.getProfile2 = function(req, res, next){

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

  res.render(req.render, {
    user: req.user, 
    form: form, 
    error: error, 
    plans: plans
  });
  
};

//@TODO finish and test
exports.getCancelMyAccountAction = function (req, res, next){

  // var form       = {},
  //     error      = null,
  //     formFlash  = req.flash('form'),
  //     errorFlash = req.flash('error');

  // if (formFlash.length) {
  //   form.email = formFlash[0].email;
  // }

  // if (errorFlash.length) {
  //   error = errorFlash[0];
  // }

  // res.render(req.render,{
  //   user: req.user, 
  //   form: form, 
  //   error: error,
  // })
};

//@TODO finish and test
exports.updateForwardEmailAction = function (req, res, next){

  // var form       = {},
  //     error      = null,
  //     formFlash  = req.flash('form'),
  //     errorFlash = req.flash('error');

  // if (formFlash.length) {
  //   form.email = formFlash[0].email;
  // }

  // if (errorFlash.length) {
  //   error = errorFlash[0];
  // }

  // res.render(req.render,{
  //   user: req.user, 
  //   form: form, 
  //   error: error,
  // })
};

exports postForwardEmailAction = function (req, res, next){

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

  res.render(req.render,{
    user: req.user, 
    form: form, 
    error: error,
  })
};