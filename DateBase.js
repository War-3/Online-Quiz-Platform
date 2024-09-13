const mongoose = require("mongoose")
const dotenv = require("dotenv").config()


const connectDB = async ()=>{
    mongoose.connect(`${process.env.MONGODB_UL }`)
    .then(()=> console.log("My MongoDB Connected..!"))
}

module.exports = connectDB