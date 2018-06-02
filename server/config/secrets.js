var dotenv = require('dotenv');
// // There's no need to check if .env exists, dotenv will check this
// // for you. It will show a small warning which can be disabled when
// // using this in production.

dotenv.load();




module.exports = {

  db: process.env.MONGODB_URI || 'mongodb://heroku_r9wdks9x:705ed3cpj3cqhn7grhjrss3q7a@ds245150.mlab.com:45150/heroku_r9wdks9x',

  sessionSecret: process.env.SESSION_SECRET || '34SDgsdgspxxxxxxxdfsG', //you can use a long random string

  // we propose to use mailgun, but if you have email server, you can fill credentials below
  mailgun: {
    apiKey: process.env.MAILGUN_API_KEY || '',
    domain: process.env.MAILGUN_DOMAIN  || ''
  },

  // poolConfig for SMTP, nodemailer package
  emailServer: {

    pool: true,
    host: '', //EMAIL_HOST
    port: 465,
    secure: true, // use TLS
    auth: {
        user: '', //EMAIL_USERNAME
        pass: ''  //EMAIL_PASSWORD
    },

    logger : true,
    debug  : true

  },

  stripeNextVersion:{
    "public": {
      "plans": [
       {
        name    : "Free Plan",
        id      : "free",
        interval: "month",
        currency: "eur",
        amount  : 0, //0
        change  : false, // default : true - so this plan will be assigned if user don't finish payment
       },
       {
        name    : "Quarterly",
        id      : "quarterly",
        interval: "month",
        interval_count: "3",
        currency: "eur",
        amount  : 1485, //0
        change  : true,

        text: ""
      },
      {
        name    : "Yearly",
        id      : "yearly",
        interval: "year",
        currency: "eur",
        amount  : 4560, //0
        change  : true,

        text: ""
      }
    ],
      "stripe": {
        "testPublishableKey": "pk_test_wlMBFmqetAqkqAoYQr6CfiF9",
        "livePublishableKey": "pk_live_"
      }
  },
  "private": {
    "stripe": {
      "testSecretKey": "sk_test_41tXNokC4a1y9mIHh7itAgaD",
      "liveSecretKey": "sk_live_"
    }
  }
},


  googleAnalytics: process.env.GOOGLE_ANALYTICS || ''


};
