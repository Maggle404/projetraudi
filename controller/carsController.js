const Car = require("../model/carsModel")
const options = require("../model/optionsModel")

const sequelize = require("../database/database")

//---------------------------
//carsController ne rends que les voitures en visu, c'est le CATALOGUE
//la modif des voitures se fait sur adminController.js
//---------------------------


exports.getCars = async(req, res)=>{
    let result = await Car.findAll()
    res.status(200).json(result)
}

exports.auth = async(req, res, next)=>{
    console.log(req.body.token);
    const token = req.body.token ? req.body.token : req.headers.authorisation
    if(token){
        let decoded = jwt.verify(token, process.env.APIKEY)
        console.log(decoded);
        if (decoded){
            next()
        }
        else{
            return res.status(401).json("unauthorised")
        }
    }
    else{
        return res.status(401).json("unauthorised")
    }
}