// import model in userController.js file
const users= require('../Models/userSchema')

// import jsonwebtoken
const jwt=require('jsonwebtoken')
  exports.register = async (req,res)=>{
    console.log(req.body)
    const {username,acno,password}=req.body

    if(!username || !acno || !password){
        res.status(406).json("all inputs are required") 
        // forbidden code -403
    }

try{
    const preuser= await users.findOne({acno})
    console.log(preuser);
    if(preuser){

       

        res.status(403).json("User already exist!!!")
        // 406 - not exeptable
    }
     else{
        
        //add user to db

        const newuser=new users({
            username,
            password,
            acno,
            balance:5000,
            transactions:[]
        })
        // to save newuser in mongodb
        await newuser.save()
        res.status(200).json(newuser)
        //  200 status code - success
    }
}
catch(error){
    res.status(401).json(error)
}
}


// login
exports.login = async (req,res)=>{
    // get req body
    const {acno,password}=req.body

    try{
        // check acno and pswd in db
        const preuser= await users.findOne({acno,password})

        // check preuser 
        if(preuser){
            
        //generate token using jwt
        const token=jwt.sign({
            loginAcno:acno
        },"supersecretkey12345")
        
            
            res.status(200).json({preuser,token})
        }
        else{
            res.status(404).json("Invalid account number or password")
        }

    }
    catch(error){
        res.status(401).json(error)
    }

}

exports.getBalance= async(req,res)=>{
    // get acno from path parameter
    let acno=req.params.acno

    // get data of give acno
    try{
       const preuser =  await users.findOne({acno})
        if(preuser){
            res.status(200).json(preuser.balance)
        }
        else{
            res.status(404).json("Invalid Account Number")
        }
    }
    catch(error){
        res.status(401).json(error)

        
    }
}

// transfer
exports.transfer = async(req,res)=>{
    console.log("Inside transfer logic");
    const {creditAcno,creditAmount,profilePassword}=req.body
    const {debitAcno}=req
    console.log(debitAcno)
    
    // check debit acno n pswd is available
    try{
        const debitUserDetails=await users.findOne({acno:debitAcno,password:profilePassword})
        console.log(debitUserDetails)
        
        // get credit acno details from the mongodb
        const creditUserDetails=await users.findOne({acno:creditAcno})
        console.log("credit user details" ,creditUserDetails);

        if(creditAcno!=debitAcno){
              if(debitUserDetails && creditUserDetails){
            const amount=Number(creditAmount)
            // perform transfer
            // check for balance -
            if(debitUserDetails.balance>=amount){
                // credit amount from debitUserDetails
                debitUserDetails.balance-=amount

                  // add debit transaction to debitUserDetails
                debitUserDetails.transactions.push(
                    {transaction_Type:"DEBIT",amount:amount,fromAcno:debitAcno,toAcno:creditAcno}
                )


                // save details
                debitUserDetails.save()
                // credit amount to creditUserDetails
                creditUserDetails.balance+=amount

                   creditUserDetails.transactions.push(
                    {transaction_Type:"CREDIT",amount:creditAmount,fromAcno:debitAcno,toAcno:creditAcno}
                )
                // save in mongodb 
                creditUserDetails.save()
                res.status(200).json("Fund Transfer successfully")
            
            }
            else{
                res.status(406).json("Insufficient balance")
            }
        }
        else{
            res.status(406).json("Invalid user details")
        }
        }
        else{
            res.status(406).json("Operation Denied!!! self transactions are not allowed")
        }
    }   
    catch(error){
        res.status(401).json(error)
    }



}

exports.getTransactions =async(req,res)=>{
    console.log("Inside get transactions");
    // get acno from req.debitAcno
    let acno=req.debitAcno

    // check acno exist in mongodb
    try{
        const preuser=await users.findOne({acno})
        res.status(200).json(preuser.transactions)
    }
    catch(err){
        res.status(401).json("Invalid Account number")
    }

   
}

 // deleteAcno
 exports.deleteMyAcno= async (req,res)=>{
    // get acno from req
    let acno=req.debitAcno

    // remove acbi from db
    try{
        await users.deleteOne({acno})
        res.status(200).json("Removed successfully")
    }
    catch(error){
        res.status(401).json(error)
    }
}
