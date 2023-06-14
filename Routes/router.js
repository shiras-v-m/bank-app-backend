// steps:
    // 1. import express
    const express= require('express')
    
      // import controller
      const userController= require('../controllers/userController')
    
      // import routerspecific
      const middleware=require('../Middleware/routerSpecific')
    
    // 2. create routes, using express.Router() class
    const router = new express.Router()
    
  
    // 3. define routes to resolve http request
    

    // 4.resgister request - each request is get from the routes
    router.post(`/employee/register`,userController.register)

    // login request
    router.post('/employee/login',userController.login)

    router.get(`/user/balance/:acno`,middleware.logMiddleware,userController.getBalance)

    // fund transfer
    router.post(`/user/transfer`,middleware.logMiddleware,userController.transfer)

    // ministatement
    router.get(`/user/ministatement`,middleware.logMiddleware,userController.getTransactions)

  // delete acount
  router.delete('/user/delete',middleware.logMiddleware,userController.deleteMyAcno)

// export router (to get in index)
module.exports=router


