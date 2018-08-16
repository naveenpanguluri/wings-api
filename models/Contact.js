var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = new Schema({

  contactfirstname: {
    type: String,
    required: [true, 'firstname field is required']
  },
  contactlastname: {
    type: String,
    required: [true, 'lastname field is required']
  },
  contactemail: {
    type: String,
    required: [true, 'email field is required']
  },
  contactphonenumber: {
    type: Number,
    required: [true, 'phonenumber field is required']
  },
  contactmessage: {
    type: String,
    required: [true, 'message field is required']
  },

});

var Contact = mongoose.model('contact', ContactSchema);

module.exports = Contact;
