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

const express = require('express');
const app = express();
const port = 8000; // Vous pouvez choisir le port de votre choix

// Middleware pour servir des fichiers statiques (CSS, images, etc.)
app.use(express.static('public'));

// Définition de la route pour servir la page HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + 'C:\Users\ps3ka\Desktop\projetraudi\Front-end\Comptable.html');
});

// Écoute du serveur sur le port spécifié
app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port 8000`);
});
