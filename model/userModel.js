const DataTypes = require("sequelize")
const sequelize = require("../database/database")

const User = sequelize.define("User", {
    id:{
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false
    },
    role:{
        type:DataTypes.STRING,
    }
},{
    freezeTableName: true
})

User.sync({alter:true});

module.exports = User