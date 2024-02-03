const DataTypes = require("sequelize")
const sequelize = require("../database/database")
const User = require("./userModel.js")

sequelize.authenticate().then(()=>{
    console.log("login success");
}).catch((error)=>{
    console.log(error);
})


const Car = sequelize.define("car", {
    id:{
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


Car.belongsToMany(User, {through: "compta"})
User.belongsToMany(Car, {through: "compta"})

module.exports = Car

const reload = async()=>{
    Car.sync({alter: true})
}
reload()