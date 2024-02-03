const Car = require("../model/carsModel.js")
const jwt = require('jsonwebtoken')
require("dotenv").config()

//---------------------------
// DISPLAY L'HISTORIQUE DE VENTE ICI (besoin d'aide de nathan)
//---------------------------

exports.checkCompta = (req, res, next) => {
    if (req.user && req.user.role === 'comptable') {
        next();
    } else {
        res.status(403).json({ message: 'NUH UH' });
    }
}


exports.getCars = async(req, res)=>{
    let result = await Car.findAll()
    res.status(200).json(result)
}