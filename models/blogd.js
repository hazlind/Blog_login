const mongoose = require('mongoose');




var blogSchema = new mongoose.Schema({
    title :{
        type: String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    authorn:{
        type:String,
        required:true
    },
    description:{
        type:String
    }

});

var Blogd = mongoose.model("Blogd", blogSchema);

module.exports = Blogd;