const Validator=require('validator');
const isEmpty=require('./is-empty');

module.exports=function validatePostinput(data)
{
let errors={};
data.text=!isEmpty(data.text)?data.text:'';

if(Validator.isEmpty(data.text))
{
  console.log("HERE")
  errors.title="Text is  REQUIRED"
}



return{
  errors,
  isValid:isEmpty(errors)
}


}
