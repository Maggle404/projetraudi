const { HistoriqueAchat, GainTotalMois } = require('../models'); // Remplacez par les modèles réels de votre base de données

app.get('/comptables', async (req, res) => {
    try {
        const historiqueAchats = await HistoriqueAchat.findAll(); // Remplacez par votre requête Sequelize réelle
        const gainTotalParMois = await GainTotalMois.findAll(); // Remplacez par votre requête Sequelize réelle

        res.render('comptables', { historiqueAchats, gainTotalParMois });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de la récupération des données.');
    }
});
