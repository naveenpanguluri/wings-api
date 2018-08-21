var express = require('express');
var router = express.Router();
var Register = require('../models/Register');
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


router.post('/registerUser', function(req, res, next) {

  // Create a password salt
  var salt = bcrypt.genSaltSync(10);

  // Salt and hash password
  var passwordToSave = bcrypt.hashSync(req.body.userPass, salt);

  // console.log("bcryptpass", passwordToSave);
  req.body.userPass = passwordToSave;

  Register.create(req.body).then(function(client) {
    console.log("registered user", client);

    res.status(200).json({
      success: 'New user has been created'
    });

    // res.status(200).send(client);

  }).catch(function(error) {
    console.log('error', error);
    res.status(400).send(error);
  });
  // .catch(next);
});



router.post('/login', function(req, res, next) {

  Register.findOne({
      userName: req.body.userName
    })
    .exec()
    .then(function(user) {
      console.log("loginUser", user);
      if (user) {
        bcrypt.compare(req.body.userPass, user.userPass, function(err, result) {
          console.log(err, result);
          if (err) {
            return res.status(401).json({
              error: 'Unauthorized Access'
            });
          }
          if (result) {

            var JWTToken = jwt.sign({
                userName: req.body.userName
              },
              'secret', {
                expiresIn: '2h'
              });
            return res.status(200).json({
              success: 'loggedIn successfully',
              accessToken: JWTToken,
              authsuccess: result
            });

          }

          return res.status(401).json({
            error: 'Password mismatched..!'
          });
        });
      } else {
        return res.status(401).json({
          error: 'email not exists..!'
        });
      }
    })
    .catch(function(error) {
      res.status(500).json({
        error: error
      });
    });


});


module.exports = router;
