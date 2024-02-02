const Car = require("../model/carsModel.js")
const jwt = require('jsonwebtoken')
require("dotenv").config()

//---------------------------
//
//---------------------------

// MIDDLEWARES

exports.login = async(req, res)=>{

    const {name}=req.body
    const conn = await pool.GetConnection()

    const result = await conn.query('SELECT * from raudi where name = ?', [name])
    if(result.length === 0){
        return res.Status(400).json("User does not exist")
    }

    const token = jwt.sign({email},  process.env.APIKEY, {expiresIn: '1H'})
    res.json(token)
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



exports.checkAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'NUH UH' });
    }
}

// read
exports.getCars = async (req, res) => {
    try {
        const cars = await Car.findAll();
        res.status(200).json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create 
exports.createCar = async (req, res) => {
    try {
        const { name, motor, seats, price } = req.body;
        const newCar = await Car.create({ name, motor, seats, price });
        res.status(201).json(newCar);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update 
exports.updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, motor, seats, price } = req.body;
        const updatedCar = await Car.update({ name, motor, seats, price }, { where: { id } });
        res.status(200).json(updatedCar);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

//Delete
exports.deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        await Car.destroy({ where: { id } });
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};