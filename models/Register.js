var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegisterSchema = new Schema({

  userName: {
    type: String,
    required: [true, 'email field is required'],
    unique: true
  },

  userPass: {
    type: String,
    required: [true, 'password field is required']
  }

});

var Register = mongoose.model('register', RegisterSchema);

module.exports = Register;
