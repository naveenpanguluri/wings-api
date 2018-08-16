var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LoginSchema = new Schema({

userName:{
  type: String,
  required: [true, 'email field is required']
},

userPass:{
  type: String,
  required: [true, 'password field is required']
}

});

var Login = mongoose.model('login', LoginSchema);

module.exports = Login;
