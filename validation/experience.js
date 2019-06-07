const Validator=require('validator');
const isEmpty=require('./is-empty');

module.exports=function validateExperienceinput(data)
{
let errors={};
data.title=!isEmpty(data.title)?data.title:'';
data.company=!isEmpty(data.company)?data.company:'';
data.from=!isEmpty(data.from)?data.from:'';

console.log(data)
if(Validator.isEmpty(data.title))
{
  console.log("HERE")
  errors.title="TITLE REQUIRED"
}
if(Validator.isEmpty(data.company))
{
  errors.company="COMPANY IS REQUIRED"
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
