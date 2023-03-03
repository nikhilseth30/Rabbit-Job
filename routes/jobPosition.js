const express = require('express');
const router = express.Router();
const login = require ('../middleware/login');
const Signup = require ('../models/signup');


router.post("/createPost", login,(req,res) => {
    const {positionName,salary} = req.body
    console.log(req.body)
    if ( !positionName || !salary) {
        return res.status(422).json({error: "please add all the Fields"})
    }else{
        const Signup = new signup({positionName,salary,postedBy:req.user})
        Signup.save()
        .then(result => res.json(result))
    }
})







module.exports = router