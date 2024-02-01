
//carsController ne rends que les voitures en visu, c'est le CATALOGUE
//la modif des voitures se fait sur adminController.js

const Car = require("../model/carsModel")
const sequelize = require("../database/database")


exports.getCars = async(res, req)=>{
    let result = await Car.findAll()
    res.status(200).json(result)
}