var express = require('express');
var router = express.Router();
var Login = require('../models/Login');
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt');


router.post('/login', function(req, res, next) {

  // Create a password salt
  var salt = bcrypt.genSaltSync(10);

  // Salt and hash password
  var passwordToSave = bcrypt.hashSync(req.body.userPass, salt);
  // console.log("bcryptpass", passwordToSave);
  req.body.userPass = passwordToSave;
  console.log('req.body.',req.body);

  Login.create(req.body).then(function(client) {

    res.status(200).send(client);
    console.log('clientData', client);
  }).catch(function (error) {
    console.log('error',error);
    res.status(400).send(error);
  });
  // .catch(next);
});


module.exports = router;
