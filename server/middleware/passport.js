var LocalStrategy      = require('passport-local').Strategy;
var RememberMeStrategy = require('passport-remember-me').Strategy;
var User = require('../models/user');

module.exports = function(passport){

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });






  // login
  passport.use('login', new LocalStrategy({
      usernameField: 'email',
      passReqToCallback : true
    },
    function(req, email, password, done) {

      User.findOne({ 'email' :  email },
        function(err, user) {

          if (err) return done(err);

          if (!user){
            return done(null, false, req.flash('error', 'User not found'));
          }

          user.comparePassword(password, function(err, isMatch) {

            if (isMatch) {
              var time = 14 * 24 * 3600000;
              req.session.cookie.maxAge = time; //2 weeks
              req.session.cookie.expires = new Date(Date.now() + time);
              req.session.touch();
              return done(null, user, req.flash('success', 'Successfully logged in.'));
            } else {
              return done(null, false, req.flash('error', 'Invalid Password'));
            }

          });
        }
      );
    })
  );


  passport.use('signup2', new LocalStrategy({
      usernameField: 'email',
      passReqToCallback : true
    },
    function(req, email, password, done) {

      var findOrCreateUser = function(){

        User.findOne({ email: req.body.email }, function(err, existingUser) {

          console.log( existingUser );

          if (existingUser) {
            req.flash('form', {
              email: req.body.email
            });

            return done(
                      null,
                      false,
                      req.flash('error', 'An account with that email address already exists.')
                    );
          }

          console.log( req.body );

          // edit this portion to accept other properties when creating a user.
          var user = new User({
            email   : req.body.email,
            //@TODO set password empty, because we have a first version
            // password: req.body.password, // user schema pre save task hashes this password

            profile : {
              domain : req.body.domain,
            }

          });

          //or
          user.profile.domain = req.body.domain;

          //call to Namecheap API and book current domain from other purchases.
          //get response message - 'success' and only after that message we'll be able to save user,
          // assign Stripe Subscription plan to them, etc. etc. etc.

          user.save(function(err) {

            console.log( user );

            if (err) return done(err, false, req.flash('error', 'Error saving user.'));

            var time = 14 * 24 * 3600000;
            req.session.cookie.maxAge = time; //2 weeks
            req.session.cookie.expires = new Date(Date.now() + time);
            req.session.touch();


            // don't show thank you in first - short registration time
            // return done(null, user, req.flash('success', 'Thanks for signing up!!'));

          });

        });
        
      };

      process.nextTick(findOrCreateUser);

    })
  );


  passport.use('login', new RememberMeStrategy(
    function(token, done) {

      Token.consume(token, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
      });

    },
    function(user, done) {

      var token = utils.generateToken(64);
      Token.save(token, { userId: user.id }, function(err) {
        if (err) { return done(err); }
        return done(null, token);
      });
      
    }

  ));

};
