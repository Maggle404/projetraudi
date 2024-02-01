const express=require("express")

const Route=express.Router()
const userController=require("../controller/userController.js")
const carsController=require("../controller/carsController.js")
const checkAdmin = require("../controller/userController.js")

//read
Route.get('/cars', carsController.getCars);
//Create, update, delete
Route.post('/createCars', checkAdmin, carsController.createCar);
Route.put('/editCars/:id', checkAdmin, carsController.updateCar);
Route.delete('/deleteCars/:id', checkAdmin, carsController.deleteCar);


//read
Route.get('/listUser', checkAdmin, userController.getUser)
//Create, update, delete
Route.post('/createUser', checkAdmin, userController.createUser)
Route.put('/editUser/:id', checkAdmin, userController.editUser)
Route.delete('/deleteUser/:id', checkAdmin, userController.deleteUser)


Route.get('/admin', userController.getCars)
//Route.get('/compta', userController.get)



module.exports = Route