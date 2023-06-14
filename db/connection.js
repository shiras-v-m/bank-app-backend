// define node add mongodb database connectivity

// import mongoose in connection.js file
const mongoose =require('mongoose')

// to get connection string from .env file process.env
const connectionString = process.env.DATABASE

// connect node app with mongodb 
mongoose.connect(connectionString,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("MongoDB Atlas connected succesfully");
}).catch((error)=>{
    
        console.log("MongoDB connection error!");
   
})
