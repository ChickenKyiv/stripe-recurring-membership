'use strict';

var Stripe = require('stripe'),
    stripe = {};

// var stripe = require("stripe")(options.apiKey);

module.exports = exports = function stripeCustomer (schema, options) {
  

  var secretKey = options.private.stripe.testSecretKey;
  // var secret = options.private.stripe.liveSecretKey;
  
  if( !secretKey ){ //error handler if we have empty plans
    throw new Error('Please configure your Stripe API keys on https://dashboard.stripe.com/account/apikeys');
  }
  
  stripe = Stripe(secretKey);


  schema.add({
    stripe: {
      customerId     : String,
      subscriptionId : String,
      last4          : String,
      plan           : {
          type   : String,
          default: 'free'
          // default: options.defaultPlan
      }
    }
  });

  schema.pre('save', function (next) {

    var user = this;
    if( !user.isNew || user.stripe.customerId ) return next();

    user.createCustomer(function(err){
      if (err) return next(err);
      next();
    });

  });

  //@TODO finish this method and change getPlans
  //from Stripe API List Plans method
  schema.statics.listPlans = function () {
    var array = [];
    var response = stripe.plans.list(
      { limit: 3 },
      function(err, plans) {
        // asynchronously called

        console.log( plans );
        console.log( plans.data );


        


        plans.data.forEach(function(plan){

          console.log( plan );
          var a = {
            id       : plan.id,
            name     : plan.name,
            interval : plan.interval,            
            currency : plan.currency,
            amount   : plan.amount, //0
            change   : (plan.amount) ? true : false
            interval_count : plan.interval_count,
          }

          console.log( plan );

          var amount = plan.amount;
          var euro   = amount / 100;
          euro.toLocaleString("en-US", {style:"currency", currency:"EUR"});

          console.log(euro);
          // array[] = {  }
          // element.amount = euro;


        });

        

      }
    );

    return array;

  };

  schema.statics.getPlans = function () {

    // @todo add checking that all data placed at planData object
    // if( !options.planData ){ //error handler if we have empty plans
    //   throw new Error('Please configure your Stripe subscription plans on https://dashboard.stripe.com/plans');
    // }

    // return options.planData;

    //@todo add checking that all data placed at planData object
    if( !options.public.plans ){ //error handler if we have empty plans
      throw new Error('Please configure your Stripe subscription plans on https://dashboard.stripe.com/plans');
    }

    var plans = options.public.plans;

    plans.forEach(function(element){

        var amount = element.amount;
        var euro   = amount / 100;
        euro.toLocaleString("en-US", {style:"currency", currency:"EUR"});

        console.log(euro);
        element.amount = euro;

    });

    
    console.log(plans);

    return plans;
    
  };

  schema.methods.createCustomer = function(cb) {
    var user = this;

    stripe.customers.create({
      email: user.email
    }, function(err, customer){

      if (err) return cb(err);

      user.stripe.customerId = customer.id;
      return cb();
    });
  };

  schema.methods.setCard = function(stripe_token, cb) {
    var user = this;

    var cardHandler = function(err, customer) {
      if (err) return cb(err);

    // @todo seems not cool, because we assign card data to user while we don't have a subscription id
    // must be in subscriptionHandler method. 
      if(!user.stripe.customerId){
        user.stripe.customerId = customer.id;
      }

      var card = customer.cards ? customer.cards.data[0] : customer.sources.data[0];
      
      user.stripe.last4 = card.last4;

      console.log( user.stripe );

      user.save(function(err){
        if (err) return cb(err);
        return cb(null);
      });
    };

    if(user.stripe.customerId){

      stripe.customers.update(user.stripe.customerId, {card: stripe_token}, cardHandler);

    } else {

      stripe.customers.create({
        email: user.email,
        card: stripe_token
      }, cardHandler);

    }
  };

  schema.methods.setPlan = function(plan, stripe_token, cb) {

    var user = this,
    customerData = {
      plan: plan
    };

    var subscriptionHandler = function(err, subscription) {
      
      if(err) return cb(err);

      user.stripe.plan = plan;
      user.stripe.subscriptionId = subscription.id;

      user.save(function(err){
        if (err) return cb(err);
        return cb(null);
      });

    };

    var createSubscription = function(){

      stripe.customers.createSubscription(
        user.stripe.customerId,
        {plan: plan},
        subscriptionHandler
      );

    };


    if(stripe_token) {

      user.setCard(stripe_token, function(err){
        if (err) return cb(err);
        createSubscription();
      });


    } else {

      if (user.stripe.subscriptionId){
        // update subscription
        stripe.customers.updateSubscription(
          user.stripe.customerId,
          user.stripe.subscriptionId,
          { plan: plan },
          subscriptionHandler
        );

      } else {

        createSubscription();

      }
    }
  };

  schema.methods.updateStripeEmail = function(cb){
    var user = this;

    if(!user.stripe.customerId) return cb();

    stripe.customers.update(user.stripe.customerId, {email: user.email}, function(err, customer) {
      cb(err);
    });

  };


  schema.methods.cancelStripe = function(cb){
    var user = this;

    if(user.stripe.customerId){

      stripe.customers.del(
        user.stripe.customerId
      ).then(function(confirmation) {
        cb();
      }, function(err) {
        return cb(err);
      });
      
    } else {
      cb();
    }
  };


};
