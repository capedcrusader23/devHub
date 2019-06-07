const express=require('express');
const route=express.Router();
const  mongoose=require('mongoose');
const passport=require('passport')
const profile=require('../../model/profile.js')
const user=require('../../model/user.js')
const validateProfileinput=require('../../validation/profile.js')
const validateExperienceinput=require('../../validation/experience.js')
const validateEducationinput=require('../../validation/education.js')

route.get('/test',(req,res)=>{
  res.json({msg:"working"})
})
route.get('/handle/:handle',(req,res)=>{
  const errors={};
  profile.findOne({handle:req.params.handle}).then((profie)=>{
    if(!profie)
    {
      errors.noprofile="NO PROFILE";
      res.status(400).json(errors);
    }
    else {
      res.json(profie);
    }
  }).catch(err=>res.status(404).json(err));
})

route.get('/user/:user_id',(req,res)=>{
  const errors={};
  profile.findOne({user:req.params.user_id}).then((profie)=>{
    if(!profie)
    {
      errors.noprofile="NO PROFILE";
      res.status(400).json(errors);
    }
    else {
      res.json(profie);
    }
  }).catch(err=>res.status(404).json(err));
})

route.get('/all',(req,res)=>{
  const errors={}
  profile.find().then((prof)=>{
    if(!prof)
    {
      errors.prof="NO PROFILES "
      res.status(400).json(errors);
    }
    else {
      res.json(prof)
    }
  }).catch(err=>res.status(404).json(err))
})





//CREATE PROFILE OF USER
route.post('/profile',passport.authenticate('jwt',{session:false}),(req,res)=>{

  const {errors,isValid}=validateProfileinput(req.body);
  if(!isValid)
  {
    return res.status(400).json(errors)
  }
  const profileFields={};
  profileFields.user=req.user.id;
  if(req.body.handle) profileFields.handle=req.body.handle;
  if(req.body.company) profileFields.company=req.body.company;
  if(req.body.website) profileFields.website=req.body.website;
  if(req.body.location) profileFields.location=req.body.location;
  if(req.body.bio) profileFields.bio=req.body.bio;
  if(req.body.status) profileFields.status=req.body.status;
  if(req.body.githubusername) profileFields.gihubusername=req.body.githubusername;
    profileFields.skills=req.body.skills.split(',')

  profileFields.social={};
if(req.body.youtube) profileFields.social.youtube=req.body.youtube;
if(req.body.twitter) profileFields.social.youtube=req.body.twitter;
if(req.body.linkedin) profileFields.social.youtube=req.body.linkedin;
if(req.body.facebook) profileFields.social.youtube=req.body.facebook;
if(req.body.instagram) profileFields.social.youtube=req.body.instagram;
profile.findOne({user:req.user.id}).then((pro)=>{
  if(pro)
  {
    profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true}).then((pr)=>res.json(pr))
  }
  else
  {

profile.findOne({handle:req.body.handle}).then((pro)=>{
  if(pro)
  {
    errors.handle="Already handle exisgt";
    res.status(400).json(handle)
  }
  else {
    console.log(profileFields)
    new profile(profileFields).save().then(pr=>res.json(pr))
  }
})
  }
})
})


//ADD EXPERIENCE TO USER
route.post('/experience',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const {errors,isValid}=validateExperienceinput(req.body);
if(!isValid)
{
  return res.status(400).json(errors);
}


profile.findOne({user:req.user.id}).then((pro)=>{
  const Exp={
    title:req.body.title,
    company:req.body.company,
    from:req.body.from,
    to:req.body.to,
    current:req.body.current,
    location:req.body.location,
    description:req.body.description
  }
  pro.experience.unshift(Exp);
  pro.save().then(s=>res.json(s));
})
})



//ADD EDUCATION TO USER
route.post('/education',passport.authenticate('jwt',{session:false}),(req,res)=>{
  const {errors,isValid}=validateEducationinput(req.body);
if(!isValid)
{
  return res.status(400).json(errors);
}


profile.findOne({user:req.user.id}).then((pro)=>{
  const Exp={
    School:req.body.school,
    degree:req.body.degree,
    from:req.body.from,
    to:req.body.to,
    current:req.body.current,
    location:req.body.location,
    fieldofstudy:req.fieldofstudy,
    description:req.body.description
  }
  pro.education.unshift(Exp);
  pro.save().then(s=>res.json(s));
})
})

//remove education
route.delete('/education/:educate',passport.authenticate('jwt',{session:false}),(req,res)=>{

profile.findOne({user:req.user.id}).then((pro)=>{

const index=pro.experience.map(item=item.id).indexOf(req.params.educate);
pro.experience.splice(index,1);
pro.save().then(re=>res.json(re));
}).catch(err=>res.status(400).json(err));
})



route.delete('/education/:educate',passport.authenticate('jwt',{session:false}),(req,res)=>{

profile.findOne({user:req.user.id}).then((pro)=>{

const index=pro.education.map(item=item.id).indexOf(req.params.educate);
pro.education.splice(index,1);
pro.save().then(re=>res.json(re));
}).catch(err=>res.status(400).json(err));
})





module.exports=route;
