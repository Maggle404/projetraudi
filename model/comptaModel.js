const DataTypes = require("sequelize")
const sequelize = require("../database/database")

//---------------------------
// totalPrice = "price" from "car" + "price" from x "options"
//---------------------------

const compta = sequelize.define('compta', {
    userName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    carName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    options:{
        type: DataTypes.STRING,
        allowNull: false
    },
    totalPrice:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    freezeTableName: true
})
  
compta.sync({alter:true});
module.exports = compta

