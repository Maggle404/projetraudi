const Car = require("../model/carsModel")
const sequelize = require("../database/database")


exports.catalogue = async(req, res)=>{
   try { let result = await Car.findAll()
    res.status(200).json(result)
   } catch (error) {console.error("Erreur lors de la récuperation du catalogue :", error);
   res.status(500).json({ message: "Erreur lors de la récuperation des données"})
}
}