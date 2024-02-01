const express=require("express")

const Route=express.Router()
const Car=require("../controller/carsController.js")

Route.get('/cars', carsController.getCars)


module.exports = Route