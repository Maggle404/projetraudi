const User = require("../model/userModel.js")
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

// FONCTIONS

//raed
exports.getUser = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error("erreur:", error);
        res.status(500).json({ message: 'erreur serveur' });
    }
}

// create
exports.createUser = async (req, res) => {
    const { name, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ where: { name } });
        if (existingUser) {
            return res.status(400).json("nom deja utilisé ");
        }
        // Hash do mdp
        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({ name, password: hashPassword, role });
        const token = jwt.sign({ email }, process.env.APIKEY, { expiresIn: '1H' });
        res.json(token);
    } catch (error) {
        console.error("erreur", error);
        res.status(500).json({ message: 'erreur serveur' });
    }
}

//edit
exports.editUser = async (req, res) => {
    const id = req.params.id;
    const { name, password, role } = req.body;
    try {
        await User.update({ name, password, role }, { where: { id } });
        res.json({ id, name, role });
    } catch (error) {
        console.error("erreur", error);
        res.status(500).json({ message: 'erreur serveur' });
    }
}

// delete
exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUserCount = await User.destroy({ where: { id } });
        if (deletedUserCount > 0) {
            res.json({ message: 'Utilisateur supprimé' });
        } else {
            res.status(404).json({ message: 'Utilisateur introuvable' });
        }
    } catch (error) {
        console.error("erreur", error);
        res.status(500).json({ message: 'erreur serveur' });
    }
}