const Sequelize = require("sequelize");

const sequelize = new Sequelize("raudi" ,"root" ,"" ,{
    host: "localhost",
    dialect: "mysql"
} )

module.exports = sequelize