const express=require("express")

const Route=express.Router()
const userController=require("../controller/userController.js")
const checkAdmin = require("../controller/userController.js")


Route.get('/listUser', checkAdmin, userController.getUsers)
Route.post('/createUser', checkAdmin, userController.create)
Route.put('/editUser/:id', checkAdmin, userController.getUsers)
Route.delete('/deleteUser/:id', checkAdmin, userController.delete)


Route.get('/admin', userController.getCars)
Route.get('/compta', User.CreateTableUser)



module.exports = Route