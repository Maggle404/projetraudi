const pool = require('../database/database.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config()

// MIDDLEWARES

const checkAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'NUH UH' });
    }
}

module.exports = checkAdmin;

// FONCTIONS

exports.getUser = async(res, req)=>{
    conn = await pool.GetConnection();
    const rows = await conn.query("SELECT * from utilisateur");
    conn.release();
    res.status(200).json(rows);
}

exports.createUser = async(req, res)=>{
    const { nom, prenom, email, password, role } = req.body;
    const conn = await pool.getConnection();

    const result = await conn.query('SELECT * from utilisateur where email = ?', [email])
    console.log(result);
    if(result[0].length > 0){
        return res.status(400).json("Error email deja utilisé")
    }
    conn.release()

    //hash du password
    const hashPassword = await bcrypt.hash(password, 10)
    await conn.query('insert into utilisateur (nom, prenom, email, password, role) values (?,?,?,?,?)', [nom, prenom, email, hashPassword, role])
    conn.release()

    const token = jwt.sign({email},  process.env.APIKEY, {expiresIn: '1H'})
    res.json(token)
}

exports.editUser = async(req, res)=>{
    const id = req.params.id;
    const { nom, prenom, email, password, role } = req.body;
    try {
        const conn = await pool.getConnection();
        const [results] = await conn.query('UPDATE utilisateur SET nom = ?, prenom = ?, email = ?, password = ?, role = ? WHERE id = ?', [nom, prenom, email, password, role]);
        conn.release();
        res.json({ id, nom, prenom, email, role });
    } catch (error) {
        console.error("Error editing user:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

exports.deleteUser = async(req, res)=>{
    const id = req.params.id;
    try {
        const conn = await pool.getConnection();
        const [results] = await conn.query('DELETE FROM utilisateur WHERE id = ?', [id]);
        conn.release();
        if (results.affectedRows > 0) {
            res.json({ message: 'Utilisateur supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Utilisateur introuvable' });
        }
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}