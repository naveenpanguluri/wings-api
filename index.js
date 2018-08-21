var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var homeroute = require('./routes/home');
var registerroute = require('./routes/register');
var contactroute = require('./routes/contact');
var mongoose = require('mongoose');
// var formidable = require('express-formidable');
// var exphbs  = require('express-handlebars');



//set up express app
var app = express();

// app.use(formidable());

app.use(cors());
//connect to mongoose
mongoose.connect('mongodb://localhost/wingsapidb');
mongoose.Promise = global.Promise;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view engine', 'ejs');

//handlebars
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');
app.use(bodyParser.json({
  limit: '50mb'
}));
// app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

//initializing routes
app.use('/api', homeroute);
app.use('/api', registerroute);
app.use('/api', contactroute);

//to make image folder and files accessable from web statically
app.use(express.static('static'));

//error handling middleware
app.use(function(err, req, res, next) {
  res.status(422).send({
    error: err.message
  });
});


//listen for requests
app.listen(3001, function(req, res) {
  console.log("now listening for request: 3001");
});
