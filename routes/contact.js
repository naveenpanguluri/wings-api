var express = require('express');
var router = express.Router();
var Contact = require('../models/Contact');
var fs = require('fs');
var path = require('path');
var nodemailer = require('nodemailer');
// var exphbs = require('express-handlebars');
var EmailTemplate = require('email-templates');
var smtpTransport = require('nodemailer-smtp-transport');

var templatesDir = path.resolve(__dirname, '../', 'templates');
console.log("template", templatesDir);
var registeredTemp = new EmailTemplate(path.join(templatesDir, 'contactEmailTemplate').toString());

router.get('/contactUs', function(req, res, next) {
  Contact.find({}).then(function(contact) {
    res.status(200).send(contact);
  }).catch(function(error) {
    console.log('error', error);
    res.status(400).send(error);
  });
});

router.post('/contactUs', function(req, res, next) {
  Contact.create(req.body).then(function(contact) {
    // console.log("backendContact", contact);

    // Use Smtp Protocol to send Email
    var smtpTransport1 = nodemailer.createTransport("SMTP", {
      service: "Gmail",
      host: "naveenpanguluri49@gmail.com",
      port: 465,
      secureConnection: false,
      tls: {
        rejectUnauthorized: false
      },
      auth: {
        user: "naveenpanguluri49@gmail.com",
        pass: "naveen@530"
      }
    });

    console.log("smtpTransport", smtpTransport1);
    var locals = {};
    registeredTemp.render(locals, function(err, results) {
      console.log("results", results);

      if (err) {
        console.log("error", err);
      }
      var mail = {
        from: [contact.email],
        to: "naveenpanguluri49@gmail.com",
        subject: "Client Registered",
        html: results.html
      };

      smtpTransport1.sendMail(mail, function(error, response) {
        if (error) {
          console.log(error);
          return res.status(400).send(error);
        } else {
          console.log("Message sent: " + response.message);
          return res.status(200).send({
            "message": "Email has been sent to ur mail."
          });
        }
        smtpTransport1.close();
      });

    });


    res.status(200).send(contact);

  }).catch(function(error) {
    console.log('error', error);
    res.status(400).send(error);
  });
});

//     var transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com', //host of mail service provider
//       port: 465,
//       secure: true,
//       auth: {
//         user: 'naveenpanguluri49@gmail.com',
//         pass: 'naveen@530'
//       },
//       tls: {
//         // do not fail on invalid certs
//         rejectUnauthorized: false
//       }
//
//     });
// alert("before");
//
//     function sendMail() {
//       alert("sendmail function");
//       //create the path of email template folder
//       // var templateDir = path.join(__dirname, "../", 'templates', 'contactEmailTemplate');
//       var templateDir = path.join(__dirname, '../templates', 'contactEmailTemplate');
//
//       var contactEmailTemplate = new emailTemplates(templateDir);
//
//       var locals = contact;
//       console.log("locals", locals);
//
//       contactEmailTemplate.render(locals, function(err, response, temp) {
// response.send(locals);
//         if (err) {
//           console.log("error", err);
//         } else {
//           transporter.sendMail({
//             from: '"newContact" <noreply@gmail.com>',
//             to: 'naveenpanguluri49@gmail.com',
//             subject: "test mail",
//             text: temp.text,
//             html: temp.html
//           }, function(error, info) {
//             if (error) {
//
//               console.log(error);
//             }
//             console.log('Message sent: ' + info.response);
//
//           });
//
//         }
//
//
//       });
//
//     }



//   let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: 'naveenpanguluri49@gmail.com',
//       pass: 'naveen@530'
//     },
//     tls: {
//       // do not fail on invalid certs
//       rejectUnauthorized: false
//     }
//
//   });
//
//   let mailOptions = {
//     from: '<noreply@gmail.com>', // sender address
//     to: 'naveenpanguluri49@gmail.com', // list of receivers
//     subject: 'test mail', // Subject line
//     text: 'hiii naveen', // plain text body
//     html: '<b> <%= contact.contactfirstname %> </b>' // html body
//   };
//
//   transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//       return console.log(error);
//     }
//     console.log('Message %s sent: %s', info.messageId, info.response);
//     res.send('An email sent to your registered email address.');
//   });
// }).catch(function(next) {
//   console.error(next);
// });

// router.put('/contactUs/:id', function(req, res, next) {
//   Contact.findByIdAndUpdate({
//     _id: req.params.id
//   }, req.body).then(function() {
//     Contact.findOne({
//       _id: req.params.id
//     }).then(function(contact) {
//       res.status(200).send(contact);
//     }).catch(function (error) {
//       console.log('error',error);
//       res.status(400).send(error);
//     });
//   }).catch(function (error) {
//     console.log('error',error);
//     res.status(400).send(error);
//   });
// });

router.delete('/contactUs/:id', function(req, res, next) {
  Contact.findByIdAndRemove({
    _id: req.params.id
  }).then(function(contact) {
    res.status(200).send(contact);
  }).catch(function(error) {
    console.log('error', error);
    res.status(400).send(error);
  });
});

module.exports = router;
