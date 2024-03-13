const express = require("express")
const app = express()
const carsRoute = require('./route/carsRoute')
const userRoute = require('./route/userRoute')



//middleware
app.use (express.json())

// API Routes:
app.use('/cars', carsRoute)
app.use('/admin', userRoute)
app.use('/test', userRoute)



//server
app.listen(8000, ()=>{
    console.log("server open on 8000")
})