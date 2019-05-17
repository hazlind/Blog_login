var express=require('express');
var router=express.Router();
var db=require('../models/index');



var items=db.Blogd;
router.get('/',function(req,res){

     res.render('home');
 });


module.exports=router;