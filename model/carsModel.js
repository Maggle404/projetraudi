const DataTypes = require("sequelize")
const sequelize = require("../database/database")
const options = require("./optionsModel")

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

Car.belongsToMany(options, {through: "car_options"})
options.belongsToMany(Car, {through: "car_options"})


const reload = async()=>{
    Car.sync({alter: true})
}
reload()