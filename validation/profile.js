const Validator=require('validator');
const isEmpty=require('./is-empty');

module.exports=function validateProfileinput(data){

let errors={};

data.handle=!isEmpty(data.handle)?data.handle:'';
data.status=!isEmpty(data.handle)?data.status:'';
data.skills=!isEmpty(data.skills)?data.skills:'';
console.log(data)
if(!Validator.isLength(data.handle,{min:2,max:30}))
{
  errors.handle="Handle needs to be 2 to 30 chars"
}
if(Validator.isEmpty(data.status))
{
  errors.status="Status is required"
}

if(Validator.isEmpty(data.skills))
{
  errors.skills="Skills field is required"
}

if(!isEmpty(data.website))
{
if(!Validator.isURL(data.website))
{
errors.website="NOT VALID URL";
}

}
if(!isEmpty(data.twitter))
{
if(!Validator.isURL(data.twitter))
{
errors.twitter="NOT VALID URL";
}
}
if(!isEmpty(data.youtube))
{
if(!Validator.isURL(data.youtube))
{
errors.twitter="NOT VALID URL";
}
}

if(!isEmpty(data.facebook))
{
if(!Validator.isURL(data.facebook))
{
errors.facebook="NOT VALID URL";
}
}


if(!isEmpty(data.instagram))
{
if(!Validator.isURL(data.instagram))
{
errors.instagram="NOT VALID URL";
}
}

if(!isEmpty(data.linkedin))
{
if(!Validator.isURL(data.linkedin))
{
errors.linkedin="NOT VALID URL";
}
}


return{
  errors,
  isValid:isEmpty(errors)
}


}
