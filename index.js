//import environmental variable

require('dotenv').config()

const express=require('express')

// import cors
const cors=require('cors')


// import router
const router= require('./Routes/router.js')

//create express server
const server= express() 

// import db connection.js
require('./db/connection')

// import appmiddleware
const middleware=require('./Middleware/appMiddleware.js')

// setup port number for server
const PORT = 3000 || process.env.PORT

// use cors,json parser in server
server.use(cors())
server.use(express.json())

// use router in server app after using json parser
server.use(router)

// use app middleware
server.use(middleware.appMiddleware)
// to resolve http request using express server
server.get('/',(req,res)=>{
    res.send('<h1>Bank server Started!!!</h1>')
})

// server.post('/',(req,res)=>{
//     res.send('This is a post method')
// })

// server.put('/',(req,res)=>{
//     res.send('This is a put method')
// })

// server.delete('/',(req,res)=>{
//     res.send('This is a delete method')
// })



// run the server app in a specified port
server.listen(PORT,()=>{
    console.log(`Bank server started at port ${PORT}` );
})
