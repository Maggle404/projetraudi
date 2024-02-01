const DataTypes = require("sequelize")
const sequelize = require("../database/database")


const options = sequelize.define("options", {
    ID:{
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

cars.belongsToMany(options, {through: "cars_models"})
options.belongsToMany(cars, {through: "Product_ype"})


options.sync({alter:true});

module.exports = options