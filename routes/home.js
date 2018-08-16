var express = require('express');
var router = express.Router();
var Client = require('../models/Home');
// var json2csv = require('json2csv');
var fs = require('fs');
var path = require('path');
// var XLSX = require('xlsx');



router.get('/clients', function(req, res, next) {
  Client.find({}).then(function(client){
    res.status(200).send(client);
//code for storing data in excel sheet using json2csv module

// var fields = ['FIRSTNAME', 'LASTNAME', 'EMAIL', 'PHONE NUMBER', 'DOB', 'BLOOD GROUP', 'ADDRESS', 'BANK DETAILS', 'SUGGESTIONS', 'GENDER', 'QUALIFICATIONS', 'OCCUPATION', 'SUBSCRIPTION', 'REFERRENCE'];
// var csv = json2csv({ data: client, fields: fields });
//
// fs.writeFile('excelFile.csv', csv, function(err) {
//   if (err) throw err;
//   res.send(csv);
//
//   console.log('file saved');
// });


  }).catch(function (error) {
    console.log('error',error);
    res.status(400).send(error);
  });
});

router.get('/clients/:id', function(req, res, next) {
  console.log(req.params);
  Client.findById({_id:req.params.id}).then(function(client){
    console.log("clientid", client);
    res.status(200).send(client);
  }).catch(function (error) {
    console.log('error',error);
    res.status(400).send(error);
  });
});

router.post('/clients', function(req, res, next) {
 if(req.body.userprofileimage !== ''){
   var image = req.body.userprofileimage.split('base64,')[1];
   var bitmap = new Buffer(image, 'base64');
   fs.writeFileSync("static/images/" + req.body.email.split('@')[0] + '.jpg', bitmap);
   req.body.userprofileimage = "http://localhost:3001/images/" + req.body.email.split('@')[0] + '.jpg';
 }


  Client.create(req.body).then(function(client) {


    // var imgData = client.userprofileimage;
    // var base64Data = imgData.split("base64,")[1];
    // console.log('base64Data', base64Data);
    // require("fs").writeFile("out.png", base64Data, 'base64',
    // function(err, data) {
    // if (err) {
    //     console.log('err', err);
    // }
    // console.log('success', data);
    //
    // });

    res.status(200).send(client);
    console.log('clientData', client);
  }).catch(function (error) {
    console.log('error',error);
    res.status(400).send(error);
  });
  // .catch(next);
});

router.put('/clients/:id', function(req, res, next) {
Client.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
  Client.findOne({_id:req.params.id}).then(function(client){
    res.status(200).send(client);
  }).catch(function (error) {
    console.log('error',error);
    res.status(400).send(error);
  });
});
});

router.delete('/clients/:id', function(req, res, next) {
  Client.findByIdAndRemove({_id:req.params.id}).then(function(client){
    res.status(200).send(client);
  }).catch(function (error) {
    console.log('error',error);
    res.status(400).send(error);
  });
});

module.exports = router;
