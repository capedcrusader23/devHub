const Validator=require('validator');
const isEmpty=require('./is-empty');

module.exports=function validateExperienceinput(data)
{
let errors={};
data.school=!isEmpty(data.school)?data.school:'';
data.degree=!isEmpty(data.degree)?data.degree:'';
data.fieldofstudy=!isEmpty(data.fieldofstudy)?data.fieldofstudy:'';

console.log(data)
if(Validator.isEmpty(data.school))
{
  console.log("HERE")
  errors.title="School REQUIRED"
}
if(Validator.isEmpty(data.degree))
{
  errors.company="degree IS REQUIRED"
}
if(Validator.isEmpty(data.from))
{
  errors.from="FROM DATE IS REQUIRED"
}


return{
  errors,
  isValid:isEmpty(errors)
}


}
