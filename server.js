const express = require("express")
const path = require("path"); // Importez le module 'path'
const app = express()
const carsRoute = require('./route/carsRoute')
const userRoute = require('./route/userRoute')

<<<<<<< Updated upstream

//middleware
=======
const user = require("./route/userRoute.js")
const inscription = require("./route/inscriptionRoute.js"); //Route pour l'inscription
>>>>>>> Stashed changes
app.use (express.json())
// Configuration EJS comme moteur de modèle
app.set('view engine', 'ejs');

// Définissez le répertoire où se trouvent vos fichiers de modèles EJS
app.set('views', path.join(__dirname, 'views'));


// API Routes:
<<<<<<< Updated upstream
app.use('/cars', carsRoute)
app.use('/admin', userRoute)




=======
app.use('/user', user)
// Utilisez la route d'inscription
app.use('/inscription', inscription);
>>>>>>> Stashed changes
//server
app.listen(8000, ()=>{
    console.log("server open on 8000")
})