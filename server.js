const express=require('express');
const app=express();
const mongoose=require('mongoose');
const key=require('./config/keys.js')
const users=require('./routes/api/users')
const post=require('./routes/api/post')
const profile=require('./routes/api/profile.js')


mongoose.connect(key.mongoURL,()=>{
  console.log("DATABASE CONNECTED")
})
app.get('/',(req,res)=>{
  res.send("welcome")
})
app.use('/api/users',users)
app.use('/api/post',post)
app.use('/api/profile',profile)
var port=process.env.port||5000;
app.listen(port,()=>{
  console.log(`Server running on ${port}`)
})
