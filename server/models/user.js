var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var crypto   = require('crypto');

var stripeCustomer = require('./plugins/stripe-customer');
var secrets  = require('../config/secrets');



// var timestamps = require('mongoose-timestamp');

var options = {
        timestamps: { 
             createdAt: 'created_at',
             updatedAt: 'updated_at' 
        }        
};

var userSchema = new mongoose.Schema({

  email: { //main email
    type: String,
    unique: true,
    lowercase: true 
  },

  

  //@todo add validation messages
    
  password: String,

  profile: {
    
    // name: { 
    //   type: String, default: '' },

    // gender: { 
    //   type: String, default: '' },

    // location: { 
    //   type: String, default: '' },

    // website: { 
    //   type: String, default: '' },

    // picture: { 
    //   type: String, default: '' },

    domain:  { 
      type: String, default: '' }, 

    forwardEmail: { //second email
      type      : String,
      default   : ''
      // unique    : true,
      // lowercase : true 
    }, 


    //whois part

    first_name : { 
        type: String, default: '' },

    last_name  : { 
        type: String, default: '' },

    company_name : { 
        type: String, default: '' },

    address : { 
        type: String, default: '' },

    zip : { 
        type: String, default: '' },

    city : { 
        type: String, default: '' },

    state : { 
        type: String, default: '' },

    country : { 
        type: String, default: '' },

    phone : { 
        type: String, default: '' },

    fax : { 
        type: String, default: '' },


    plan: {
      type: String, default: '' },      
    

  },



  resetPasswordToken: String,
  resetPasswordExpires: Date
}, options);

// var stripeOptions = secrets.stripeOptions;
var stripeOptions = secrets.stripeNextVersion;


// userSchema.plugin(timestamps);
userSchema.plugin(stripeCustomer, stripeOptions);


// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {

  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


/**
 * Validate user's password.
 * Used by Passport-Local Strategy for password validation.
 */
userSchema.methods.validPassword = function(password) {

  return bcrypt.compareSync(password, this.password);
};


/**
 * Hash the password for security.
 * "Pre" is a Mongoose middleware that executes before each user.save() call.
 */


// userSchema.pre('save', function(next) {
//   var user = this;

//   if (!user.isModified('password')) return next();

//   bcrypt.genSalt(10, function(err, salt) {
//     if (err) return next(err);

//     bcrypt.hash(user.password, salt, null, function(err, hash) {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });

//   });
// });



// userSchema.methods.comparePassword = function(candidatePassword, cb) {

//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });

// };



userSchema.methods.deleteDomain = function() {

  // bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
  //   if (err) return cb(err);
  //   cb(null, isMatch);
  // });

};

//renew domain
userSchema.methods.reactivate = function() {

  // bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
  //   if (err) return cb(err);
  //   cb(null, isMatch);
  // });

};

userSchema.methods.fetch = function() {

  var information = {};


  // 2 queries
  User.find({}, {limit:10, skip:20}, function (err, users) {            
      if (err) {
          return next(err);
      }

      // information[] = {
         //   user.email
    //   user.profile.domain
    //   user.profile.first_name
    //   user.profile.last_name
      // }


      User.count({}, function (err, count) {
          if (err) {
              return next(err);
          }

          res.send({count: count, users: users});
      });
      
  });

}




module.exports = mongoose.model('User', userSchema);