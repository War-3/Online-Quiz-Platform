const express = require('express')
const connectDB = require('./DateBase')
const dotenv = require("dotenv").config()
const allRouter = require('./routes/allRoutes')
const cors = require('cors')



const app = express()


app.use(express.json())
app.use(cors())

connectDB()
const PORT = process.env.PORT || 7070




app.listen(PORT, ()=>{
    console.log('Server is running on', PORT)
});

app.get('/', (req, res)=>{
    return res.status(200).json({message: "Welcome to JAMB CBT"})
})

  app.use("/api", allRouter)




  app.use((req, res)=>{
    return res.status(200).json({message: "Sorry this endpoint does not exist."})

})