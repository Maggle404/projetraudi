const express=require("express")

const Route=express.Router()
const adminController=require("../controller/adminController.js")
const checkAdmin = require("../controller/userController.js")



//read
Route.get('/cars', carsController.getCars);
//Create, update, delete
Route.post('/createCars', checkAdmin, adminController.createCar);
Route.put('/editCars/:id', checkAdmin, adminController.updateCar);
Route.delete('/deleteCars/:id', checkAdmin, adminController.deleteCar);

