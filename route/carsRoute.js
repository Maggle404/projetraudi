const express=require("express")

const Route=express.Router()
const carsController=require("../controller/carsController.js")

Route.get('/cars', carsController.getCars)


module.exports = Route