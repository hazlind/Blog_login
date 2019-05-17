var express=require('express');
var http=require('http');
var path = require('path');
var bodyParser=require("body-parser");
var methodOverride = require('method-override')
var expressLayouts = require('express-ejs-layouts');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var app= express();

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());



app.set('views',path.resolve(__dirname, 'public'));
app.set('views',path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))



// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


var homePage=require('./routes/home.js');
var createblog=require('./routes/createblog.js');



// Routes
app.use('/home',homePage);


app.use('/home/createblog',createblog);


app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

app.use('*', createblog);
http.createServer(app).listen(8000,function(){
    console.log('its running on port 8000');
});