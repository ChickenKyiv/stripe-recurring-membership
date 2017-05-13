'use strict';

var User = require('../models/user');

exports.getUsers = function(req, res, next){

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

  User.find({}, function(err, users) {
    var userMap = {};

    users.forEach(function(user) {
      userMap[user._id] = user;
    });

    console.log( userMap );
    // res.send(userMap);  
  });


  const renderObject = {
    form : form,
    error: error,
    // plans: plans,
    domain: ''
  };

  res.render(req.render, renderObject);

};