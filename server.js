const express = require("express")
const path = require("path"); // Importez le module 'path'
const app = express()

const user = require("./route/userRoute.js")
const inscription = require("./route/inscriptionRoute.js"); //Route pour l'inscription
app.use (express.json())
// Configuration EJS comme moteur de modèle
app.set('view engine', 'ejs');

// Définissez le répertoire où se trouvent vos fichiers de modèles EJS
app.set('views', path.join(__dirname, 'views'));


// API Routes:
app.use('/user', user)
// Utilisez la route d'inscription
app.use('/inscription', inscription);
//server
app.listen(8000, ()=>{
    console.log("server open on 8000");
})