const Car = require("../model/carsModel.js")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()


// MIDDLEWARES

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