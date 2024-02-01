const express=require("express")

const Route=express.Router()
const Car=require("../controller/carsController.js")

Route.get('/createCar', Car.CreateTableCar)


module.exports = Route