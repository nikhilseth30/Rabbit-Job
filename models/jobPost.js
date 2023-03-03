const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const jobPostSchema = new mongoose.Schema({
    name:{
        type: String,                             //nikhil
        required:true
    },
    email:{
        type: String,
        required:true,
    },
    password:{
        type: String,
        required:true,
    },
    companyName:{
        type: String,
        required:true,
    },
    position:{
        type: String,
        required:true,
    },
    numberOfPosition:{
        type: String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    }, 
    phone:{
        type:String,
        required:true,
    },
    applied:[{               //["abhishek","nikhil","honey","shivanshu","vedant"]
        type:ObjectId,
        ref:"JobPost"
    }],
    notApplied:[{
        type:ObjectId,
        ref:"JobPost"
    }]
})

module.exports = mongoose.model('jobPost',jobPostSchema)