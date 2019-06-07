const express=require('express');
const route=express.Router();
const passport=require('passport')
const post=require('../../model/post.js')
const mongoose=require('mongoose')
const postvalidate=require('../../validation/post')
const Profile=require('../../model/profile')
route.post('/post',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const {isValid,errors}=postvalidate(req.body);
  if(!isValid)
  {
    return res.status(400).json(errors)
  }
  const po=new post({
    name:req.body.name,
    text:req.body.text,
    avatar:req.body.name,
    user:req.user.id
  });
po.save().then(pos=>res.json(pos));  
})
route.get('/test',(req,res)=>{
  res.json({msg:"working"})
})
//get all post
route.get('/getpost',(req,res)=>{
  post.find().sort({date:-1}).then((da)=>{
    res.status(200).json(da);
  }).catch(err=>res.json(err))
})
//get post
route.get('/getpost/:id',(req,res)=>{
  post.findOne({_id:req.params.id}).then(da=>{
    res.json(da)
  }).catch(err=>res.status(400).json({nopost:"NO POST FOUND WITH THAT ID"}))
})

route.delete('/delete/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
  Profile.findOne({id:req.user.id}).then((prof)=>{
    post.findOne({id:req.param.id}).then((pos)=>{
        if(post.user.toString()==req.user.id)
        {
            post.remove().then(()=>res.status(200).json({success:true}))
        }
        else
        {
            res.status(401).json({error:"YOU ARE NOT AUTHORIZED"})
        }
    }).catch(err=>res.status(400).json({post:"POST NOT FOUND"}))
  })
})

route.post('/like/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
  Profile.findOne({id:req.user.id}).then((prof)=>{
    post.findOne({id:req.param.id}).then((pos)=>{
        
      if(pos.likes.filter(lik=>lik.user.toString()===req.user.id).length>0)
      {
        return res.status(400).json({alreadylike:"ALREADY LIKED"})
      }
      else
      {
        pos.likes.unshift({user:req.user.id});
        pos.save().then((da)=>{
          res.status(200).json({save:"LIKED"})
        })
      }
    }).catch(err=>res.status(400).json({post:"POST NOT FOUND"}))
  })
})

route.post('/unlike/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{
  Profile.findOne({id:req.user.id}).then((prof)=>{
    post.findOne({id:req.param.id}).then((pos)=>{
        
      if(pos.likes.filter(lik=>lik.user.toString()===req.user.id).length===0)
      {
        return res.status(400).json({alreadylike:"NOT DISLIKED"})
      }
      const remove=pos.likes.map(item=>item.user.toString()).indexOf(req.user.id)
    post.likes.splice(remove,1);
    post.save().then((da)=>{
      res.status(200).json(da)
    })  
    }).catch(err=>res.status(400).json({post:"POST NOT FOUND"}))
  })
})



module.exports=route;
