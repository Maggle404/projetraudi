const DataTypes = require("sequelize")
const sequelize = require("../database/database")
const options = require("./optionsModel")

const car = sequelize.define("car", {
    ID:{
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    motor:{
        type:DataTypes.STRING,
    },
    seats:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    freezeTableName: true
})

car.belongsToMany(options, {through: "cars_models"})
options.belongsToMany(car, {through: "Product_ype"})


car.sync({alter:true});

module.exports = car