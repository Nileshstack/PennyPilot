const express = require('express')
const cors = require('cors')
const morgan= require('morgan')
const dotenv = require('dotenv')
const { default: connectDB } = require('./config/db')
const path = require('path')
dotenv.config()
connectDB();

const app= express()

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
//user routes
app.use('/api/v1/users',require('./routes/userRoutes'))
//transection Routes
app.use('/api/v1/transections',require('./routes/transectionRoutes'))

//statics files
app.use(express.static(path.join(__dirname,'./client/build')))
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})


app.listen(process.env.PORT || 8080,()=>{
    console.log(`Node server is running In ${process.env.DEV_MODE} mode on port on ${process.env.PORT}`)
})