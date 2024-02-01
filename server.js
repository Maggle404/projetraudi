const express = require("express")
const app = express()


app.use (express.json())

// API Routes:
app.use('/user', user)

//server
app.listen(8000, ()=>{
    console.log("server open on 8000");
})