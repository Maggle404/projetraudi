const DataTypes = require("sequelize")
const sequelize = require("../database/database")
const Car = require("../model/carsModel.js")


const options = sequelize.define("options", {
    id:{
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    freezeTableName: true
})



Car.belongsToMany(options, {through: "car_options"})
options.belongsToMany(Car, {through: "car_options"})

module.exports = options

const reload = async()=>{
    options.sync({alter: true})
}
reload()
