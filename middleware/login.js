const jwt = require('jsonwebtoken')
const { SECRETKEY } = require("../keys")
const jobPost = require('../models/jobPost')

module.exports =(req,res,next)=>{        
    // console.log(req.headers)

    const {authorization} = req.headers  //Bearer xxxxx.yyyy.zzzz
    if (!authorization){
        return res.status(401).json({ error:"You Are logged In" })
    }else{
        const token = authorization.replace("Bearer ","")
        jwt.verify(token,SECRETKEY,(err,payload) => {
            if(err){
                console.log("error",err)
                return res.status(401).json({error:"You must be logged In"})
            }else{
                console.log("Hello",payload)

                    const {id} = payload    //payload variable hai
                    jobPost.findById(id)
                    .then(userData => {
                         userData.password = undefined
                        //  console.log(userData)
                         req.user = userData   //{object}
                         next()
                    })
            }
        })
    }
}



