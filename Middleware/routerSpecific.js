// router specific middleware
// import jwt 
const jwt=require('jsonwebtoken')
// define logic for checking user loginned or not 
const logMiddleware=(req,res,next)=>{
    console.log("Router specific middleware")
    // get token
    const token=req.headers['access-token']
    // verify token
    console.log(token);
    // verify token
    try{
        // get token
        const {loginAcno}=jwt.verify(token,"supersecretkey12345")
        console.log(loginAcno)

    console.log(loginAcno);
        // pass loginAcno to req
    req.debitAcno=loginAcno
   
    // to process user request
    next()
    }
    catch{
        res.status(401).json("Please login")
    }
}

module.exports={
    logMiddleware
}