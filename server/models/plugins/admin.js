'use strict';

const bcrypt = require('bcryptjs');

module.exports = exports = function createAdmin (schema) {

	const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('admin', salt);

    //or 
    // var password = 'admin'; because we have pre-save method.

	var admin = {
	  email: 'ad@min.com',
      password: hash,
      admin: true
	}

	return new User(admin).save();
};