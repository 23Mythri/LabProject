const express = require('express');
const UserRouter = express.Router();
 
const UserController=require('../controller/sampleReport')

const userController = require('../controller/users')
 
const auth=require('../middleware/auth')

//Registration
UserRouter.post('/register',userController.register)

UserRouter.get('/users',userController.usersData)
//Login
UserRouter.post('/login',userController.login)

//  edit
UserRouter.get('/getUser/:_id',userController.getUser)
UserRouter.put('/getUser',userController.getUsers)
UserRouter.post("/getUser",userController.getUsers)

//  add report
UserRouter.post('/addreport',UserController.addSample)
UserRouter.get('/viewSample',UserController.getAllsamples)

module.exports =UserRouter
 