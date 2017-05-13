'use strict';

var User = require('../models/user'),
plans = User.getPlans();

exports.getAdminPage = function(req, res, next){

  // var form = {},
  // error = null,
  // formFlash = req.flash('form'),
  // errorFlash = req.flash('error');

  // if (formFlash.length) {
  //   form.email = formFlash[0].email;
  // }
  // if (errorFlash.length) {
  //   error = errorFlash[0];
  // }

    const renderObject = {

      // messages: req.flash('messages')
      // form: form,
  //   error: error,
  //   plans: plans,
  //   domain: ''
    };

  // res.render(req.render, renderObject);

};


// get all free users and show their emails on dashboard

exports.getAdminPage = function(req, res, next){

  // var form = {},
  // error = null,
  // formFlash = req.flash('form'),
  // errorFlash = req.flash('error');

  // if (formFlash.length) {
  //   form.email = formFlash[0].email;
  // }
  // if (errorFlash.length) {
  //   error = errorFlash[0];
  // }

  // var users = User.fetchAllUsers();

  // console.log( users );


  // function (){

  //   user.email
  //   user.profile.domain
  //   user.profile.first_name
  //   user.profile.last_name

  // }

    // const renderObject = {

      // messages: req.flash('messages')
      // form: form,
  //   error: error,
  //   plans: plans,
  //   domain: ''
    // };

  // res.render(req.render, renderObject);


  

};

