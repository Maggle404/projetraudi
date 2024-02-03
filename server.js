const express = require("express");
const path = require("path");
const app = express();

const carsRoute = require('./route/carsRoute');
const userRoute = require('./route/userRoute');
const inscriptionRoute = require('./route/inscriptionRoute');

// Middleware pour traiter les données JSON
app.use(express.json());

// Configuration EJS comme moteur de modèle
app.set('view engine', 'ejs');

// Définissez le répertoire où se trouvent vos fichiers de modèles EJS
app.set('views', path.join(__dirname, 'views'));

// API Routes
app.use('/cars', carsRoute);
app.use('/user', userRoute);
app.use('/inscription', inscriptionRoute);

// Serveur Express
const port = 8000;
app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
