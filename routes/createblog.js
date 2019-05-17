var express=require('express');
var router=express.Router();
var db=require('../models/index');
var methodOverride = require('method-override');

var blogModel=db.Blogd;



router.get('/',function(req,res){
    res.render('createblog');  //,{Item: item});
});



router.get('/show', function(req,res){

    blogModel.find(function(err,data){
        if(err){
            console.log(err);
        }else{
            res.render('show' ,{Items: data});
        }
    })

});


router.post('/',function(req,res){
    console.log(req.body);
    var blog=new blogModel({
        title:req.body.title,
        topic:req.body.topic,
        authorn:req.body.authorn,
        description:req.body.description
    });
    blog.save(function(err,data){
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(req.body);
            res.redirect('/home/createblog/show');
        }

    });


});
//
// // override with  for update
//
// router.use(methodOverride(function(req,res){
//   if(req.body && typeof req.body==='object' && '_method' in req.body){
//
//       var method=req.body._method;
//       delete req.body._method;
//       return method;
//   }
//
//
// }));


//for update goes to uupdate and gives a edit button
router.get('/:id',function(req,res){
    blogModel.findById({_id:req.params.id}, function(err,data){
        if(err){
            console.log(err);
        }
        else{
            res.render('update', {data: data})
        }
    })

});


//here on clicking edit button it gets updated
router.put('/:id',function(req,res){
    console.log(req.body);
    blogModel.findByIdAndUpdate({_id:req.params.id},req.body)
        .then(function(){
            res.redirect('/home/createblog/show');
        })
        .catch(function(err){
            res.send(err);
        })
});




//delete
router.delete('/:id', function(req,res){
    blogModel.remove({_id : req.params.id})
        .then(function(){
            res.redirect("/home/createblog/show");
        })
        .catch(function(err){
            res.send(err)
        })

});

router.get('*', function(req, res){
    res.send('error in the page .please go to previous page ', 404);
});




module.exports=router;