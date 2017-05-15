'use strict';

// middleware
let secrets       = require('./config/secrets.js');
const nodemailer  = require('nodemailer');
const hbs         = require('nodemailer-express-handlebars');

module.exports = function (app, passport) {

  //testing custom mail server
  app.get('/mail-test', function(req, res, next){

    let transporter = nodemailer.createTransport( secrets.emailServer );

    console.log( transporter );

    // setup email data with unicode symbols
    let mailData = {
        from   : '"EasyMail support" <admin@easymail.io>', // sender address
        to     : 'Arthur <arthur.tkachenko.netweight@gmail.com>', // list of receivers
        subject: 'Hello ✔', // Subject line
        text   : 'Hello world ?', // plain text body
        html   : '<b>Hello world ?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log(info);

        console.log('Message %s sent: %s', info.messageId, info.response);
    });


  });

  app.get('/mail-test-html', function(req, res, next){

    
    // var EmailTemplate = require('email-templates').EmailTemplate;
    // https://community.nodemailer.com/2-0-0-beta/templating/

    var options = {
        viewPath: 'views/mails', //Path to email template folder
        // extName : '.handlebars' //extendtion of email template
    }

    let transporter   = nodemailer.createTransport( secrets.emailServer );

    transporter.use('compile', hbs (options));

    var host  = req.get('host');
    var host2 = req.headers.host;
    var expireLink = "xxxxxxxxxxxx";
    var from  = '"EasyMail support" <admin@easymail.io>';

    var params = {
      host: host,
      link: expireLink,
      // from: from
    };

    // setup email data with unicode symbols
    let mailData = {
        from   : from, // sender address
        to     : 'Arthur <arthur.tkachenko.netweight@gmail.com>', // list of receivers
        // to: user.local.email,
        subject: 'Hello ✔',              // Subject line
        text   : 'Hello world ?',        // plain text body
        html   : '<b>Hello world ?</b>', // html body

        template: 'forgot', //Name email file template
        context: params

        // context:{hostUrl: req.headers.host,
        // customeName: user.info.firstname + ' ' + user.info.lastname,
        // resetUrl: req.headers.host + '/users/recover/' + token,
        // resetCode: token}

    };

   

    
    // var send = transporter.templateSender(new EmailTemplate('views/mails'));

    // send mail with defined transport object
    transporter.sendMail(mailData, (error, response) => {

      if (err) {
        res.send('Error send email, please contact administrator to best support.');
      }

      res.send('Email send successed to you email' + response.messageId + '. ' + response.response);
      done(err, 'done');

        // if (error) {
        //   return console.log(error);
        // }
        // console.log(response);

        // console.log('Message %s sent: %s', response.messageId, response.response);



    });


  });


};