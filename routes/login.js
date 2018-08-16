var express = require('express');
var router = express.Router();
var Login = require('../models/Login');
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt');


// Create a password salt
// var salt = bcrypt.genSaltSync(10);

// Salt and hash password
// var passwordToSave = bcrypt.hashSync(passwordFromUser, salt);



router.get('/Login', function(req, res, next) {
  Login.find({}).then(function(client){
    res.status(200).send(client);

  }).catch(function (error) {
    console.log('error',error);
    res.status(400).send(error);
  });
});

// router.get('/Login/:id', function(req, res, next) {
//   console.log(req.params);
//   Login.findById({_id:req.params.id}).then(function(client){
//     console.log("clientid", client);
//     res.status(200).send(client);
//   }).catch(function (error) {
//     console.log('error',error);
//     res.status(400).send(error);
//   });
// });

router.post('/Login', function(req, res, next) {

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

router.put('/Login/:id', function(req, res, next) {
Login.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
  Login.findOne({_id:req.params.id}).then(function(client){
    res.status(200).send(client);
  }).catch(function (error) {
    console.log('error',error);
    res.status(400).send(error);
  });
});
});

router.delete('/Login/:id', function(req, res, next) {
  Login.findByIdAndRemove({_id:req.params.id}).then(function(client){
    res.status(200).send(client);
  }).catch(function (error) {
    console.log('error',error);
    res.status(400).send(error);
  });
});

module.exports = router;
