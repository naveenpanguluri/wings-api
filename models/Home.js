var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
  userprofileimage: {
    type: String,
    allowNull: true
    // required: [true, 'userprofileimage field is required']
  },
  firstname: {
    type: String,
    required: [true, 'firstname field is required']
  },
  lastname: {
    type: String,
    required: [true, 'lastname field is required']
  },
  email: {
    type: String,
    required: [true, 'email field is required']
  },
  phonenumber: {
    type: Number,
    required: [true, 'phonenumber field is required']
  },
  dateofbirth: {
    type: Date,
    required: [true, 'dateofbirth field is required']
  },
  bloodgroup: {
    type: String,
    required: [true, 'bloodgroup field is required']
  },
  address: {
    type: String,
    required: [true, 'address field is required']
  },
  bankdetails: {
    type: String,
    required: [true, 'bankdetails field is required']
  },
  suggestions: {
    type: String,
    required: [true, 'suggestions field is required']
  },
  gender: {
    type: String,
    required: [true, 'gender field is required']
  },
  status: {
    type: String,
    required: [true, 'status field is required']
  },
  qualification: {
    type: String,
    required: [true, 'qualification field is required']
  },
  occupation: {
    type: String,
    required: [true, 'occupation field is required']
  },
  subscription: {
    type: String,
    required: [true, 'subscription field is required']
  },
  referrence: {
    type: String,
    required: [true, 'referrence field is required']
  }
});

var Client = mongoose.model('client', ClientSchema);

module.exports = Client;
