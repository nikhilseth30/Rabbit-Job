const express = require('express');
const router = express.Router();
const jobPost = require('../models/jobPost')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRETKEY } = require('../keys');



router.post("/signup", (req,res) => {
    const {name,email,password,companyName,address,phone,position,numberOfPosition} = req.body
    if (!name || !email || !password || !companyName || !address || !phone || !position ||  !numberOfPosition) { 
   
        res.status(422).json({error:"Please Add all the Fields"})

             } 
            else{
             jobPost.findOne({email:email})
             .then((savedJobPost)=>{
            if (savedJobPost){
                res.status(422).json({error:"User already exists"})
            }else{
                bcrypt.hash(password,10)
                .then(hashPassword => {
                    const JobPost = new jobPost ({
                        name,
                        email,
                        password:hashPassword,
                        companyName,
                        address,
                        phone,
                        position,
                        numberOfPosition
                    })
                    JobPost.save()
                    .then(jobPost =>{
                        res.status(200).json({msg:"user added successfully"})
                    })
                })
            }
        })
    }
    
})

router.post("/login", (req, res) =>{
    const {email,password} = req.body
    if (!email || !password) {
        return res.status(422).json({error: "Please Add Email and Password "})
    }else{
        jobPost.findOne({email:email})
        .then((savedUser)=>{              
            if(!savedUser){
                return res.status(422).json({error: "Invalid Email ID !!!!"})
            }else{
                console.log(savedUser)
                    bcrypt.compare(password,savedUser.password)
                    .then(doMatch =>{                        
                        if(doMatch){
                             const token = jwt.sign({id:savedUser._id},SECRETKEY)
                             return res.json({token})
                        }else{
                            return res.status(422).json({error:"Invalid Password !!!"})
                        }  
                    })
            }
        })
    }
})


module.exports = router