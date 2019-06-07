const Validator=require('validator')
const isempty=require('./is-empty.js')
module.exports=function validateRegisterInput(data){
let error={};
data.name=!isempty(data.name)?data.name:'';
data.email=!isempty(data.email)?data.email:'';
data.password=!isempty(data.password)?data.password:'';
data.password2=!isempty(data.password2)?data.password2:'';
console.log("HERE")
console.log(data)
if(Validator.isEmpty(data.name))
{
  error.name="Name is required";
}
if(!Validator.isLength(data.name,{min:2,max:30}))
{
  error.name="Name must be between 2 and 30 character"
}

if(Validator.isEmpty(data.email))
{
  error.email="Email is required";
}
if(!Validator.isEmail(data.email))
{
  error.email="Invalid email"
}
if(!Validator.isLength(data.password,{min:6,max:30}))
{
  error.password="Password must be of 6 digit";
}
if(Validator.isEmpty(data.password2))
{
  error.password2="confirm pasword required"
}
if(!Validator.equals(data.password,data.password2))
{
  error.check="password should match"
}
console.log("CHECKS DONE")



return{
  error,
  isValid:isempty(error)
}


}
