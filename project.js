const express = require('express')
const connectDB = require('./DateBase')
const dotenv = require("dotenv").config()
const authRouter = require('./routes/authRoutes')


const app = express()


app.use(express.json())

connectDB()
const PORT = process.env.PORT || 7070




app.listen(PORT, ()=>{
    console.log('Server is running on',PORT)
});

app.get('/', (req, res)=>{
    return res.status(200).json({message: "Welcome to JAMB CBT"})
})

  app.use("/api", authRouter)




  app.use((req, res)=>{
    return res.status(200).json({message: "Sorry this endpoint does not exist."})

})