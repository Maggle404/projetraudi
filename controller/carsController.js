const Car = require("../model/carsModel")
const sequelize = require("../database/database")


exports.getCars = async(res, req)=>{
    let result = await Car.findAll()
    res.status(200).json(result)
}