const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const signupSchema = new mongoose.Schema({
    position:{
        type:String,
        required:true,
    },
    salary:{
        type:String,
        required:true,
    },
  
    startDate:[{
        type:ObjectId,
        ref:'JobPost'
    }],
    endDate:[{
        type:ObjectId,
        ref:'JobPost'
    }],
    postedBy:{
        type:ObjectId,
        ref:"JobPost"
    }
  
})

module.exports = mongoose.model("signup",signupSchema)




