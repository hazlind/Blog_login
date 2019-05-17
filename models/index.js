const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogDetails');
mongoose.Promise = Promise;

module.exports.Blogd= require('./blogd');
module.exports.User=require('./users');


