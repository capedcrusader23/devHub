const mongoose=require('mongoose');
const schema=mongoose.Schema;

const post=new schema({
text:{
  type:String,
  required:true
},
user:{
  type:schema.Types.ObjectId
},
name:{
  type:String
},
avatar:{
  type:String
},
likes:[{user:{type:schema.Types.ObjectId,ref:'users'}}],
commnets:[
  {
    name:{
      type:String
    },
    avatar:{
      type:String
    },
    text:{
      type:String
    },
    user:{type:schema.Types.ObjectId,ref:'users'}
  }
]
})

const po=mongoose.model('post',post);
module.exports=po;
