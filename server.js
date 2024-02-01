const express = require("express")
const app = express()

const user = require("./route/userRoute.js")

app.use (express.json())

// API Routes:
app.use('/user', user)

//server
app.listen(8000, ()=>{
    console.log("server open on 8000");
})