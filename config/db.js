const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
},err=>{
 if(!err){
     console.log('Mongodb connected successfully')
 }else{
     console.log('Error in connecting mongodb',err)
 }
})