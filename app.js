var express = require('express');
require('dotenv').config()
var cors = require('cors')
var app = express();
var morgan = require('morgan');
app.use(cors())
var multer = require('multer')

var port = process.env.PORT || 3000;
var passport = require('passport');
var path = require('path');

var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//configuration ===============================================================
require('./config/passport')(passport);
var models = require("./app/models");

models.sequelize.sync({ alter: true }).then(function(){
    console.log("everything is fine")
}).catch(function(err){
    console.log(err,"Something went wrong with the database!")
})


//set up our express application
app.use(morgan('dev')); // log every request to the console
//app.use(bodyParser()); // get information from html forms

//view engine setup
app.use(express.static(path.join(__dirname, 'public')));

//required for passport
// routes ======================================================================
require('./app/routes/routes')(app, passport); // load our routes and pass in our app and fully configured passport


//launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

exports = module.exports = app;