const User = require("../model/userModel.js")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()

//---------------------------
// MODIFIER CETTE PAGE POUR Y AJOUTER UN |FORMULAIRE LOGIN REGISTER|
//---------------------------

function Token(user) {
    return jwt.sign({ name: user.name, password: user.password, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1H' 
    });
}

// LOGIN - REGISTER
exports.login = async(req, res)=>{

    const {name, password}=req.body
    const conn = await pool.GetConnection()

    const result = await conn.query('SELECT * from raudi where name = ?', [name])
    if(result.length === 0){
        return res.Status(400).json("User unknown")
    }
    
    const passwordTrue = await bcrypt.compare(password, result[0].password)
    console.log(passwordTrue);
    if(!passwordTrue){
        return res.status(400).json("INVALID PASSWRD")
    }

    const token = jwt.sign({name},  process.env.APIKEY, {expiresIn: '1H'})
    res.json(token)
}

exports.register = async(req, res)=>{
    const {name, password}=req.body
    const conn = await pool.getConnection()

    const result = await conn.query('SELECT * from raudi where name = ?', [name])
    console.log(result);
    if(result[0].length > 0){
        return res.status(400).json("utilisateur existe deja")
    }
    conn.release()

    const hashPassword = await bcrypt.hash(password, 10)
    console.log(password);
    console.log(hashPassword);
    await conn.query('insert into raudi (name, password) values (?,?)', [name, hashPassword])
    conn.release()

    const token = jwt.sign({email},  process.env.APIKEY, {expiresIn: '1H'})
    res.json(token)
}

// NE PAS MODIFIER
exports.checkAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Token manquant' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalide' });
        }
        req.user = decoded;
        next();
    });
}

exports.checkAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'NUH UH' });
    }
}

// FONCTIONS

//read
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
        res.json({ id, name, password, role });
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