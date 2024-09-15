const mongoose = require('mongoose')


const registrationSchema = new mongoose.Schema(
    {
        firstName: {type: String},
        lastName:{type: String},
        email: {type: String, require: true},
        password: {type: String, require: true},
       
    },{
        timestamps: true
    }
)


const Users = new mongoose.model("Users", registrationSchema)

module.exports = Users