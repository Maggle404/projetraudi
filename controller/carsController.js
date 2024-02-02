const Car = require("../model/carsModel")
const sequelize = require("../database/database")

//---------------------------
//carsController ne rends que les voitures en visu, c'est le CATALOGUE
//la modif des voitures se fait sur adminController.js
//---------------------------


exports.getCars = async(req, res)=>{
    let result = await Car.findAll()
    res.status(200).json(result)
}