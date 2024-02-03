const express=require("express")

const Route=express.Router()
const userController=require("../controller/userController.js")
const carsController=require("../controller/carsController.js")
const checkAdmin = require("../controller/userController.js")


//read
Route.get('/listUser', checkAdmin.checkAdmin, userController.getUser)
//Create, update, delete
Route.post('/createUser', checkAdmin.checkAdmin, userController.createUser)
Route.put('/editUser/:id', checkAdmin.checkAdmin, userController.editUser)
Route.delete('/deleteUser/:id', checkAdmin.checkAdmin, userController.deleteUser)


Route.get('/admin', carsController.getCars)
//Route.get('/compta', userController.get)



module.exports = Route