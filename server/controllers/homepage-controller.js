'use strict';

exports.getHome = function(req, res, next){

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

  const renderObject = {
    form: form,
    error: error,
    // plans: plans,
    domain: ''
  };

  res.render(req.render, renderObject);

};