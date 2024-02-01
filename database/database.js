const Sequelize = require("sequelize");

const sequelize = new Sequelize("raudi" ,"root" ,"" ,{
    host: "localhost",
    dialect: "mysql"
} )


// test connection
sequelize.authenticate().then(()=>{
    console.log("login success");
}).catch((error)=>{
    console.log(error);
})



module.exports = sequelize