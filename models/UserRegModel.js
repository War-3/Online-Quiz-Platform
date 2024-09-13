const mongoose = require('mongoose')


const registrationSchema = new mongoose.Schema(
    {
        name: {type: String},
        email: {type: String, require: true},
        password: {type: String, require: true},
        state: {type: String},
        phoneNumber: {type: Number, require: true}
       
    },{
        timestamps: true
    }
)


const Users = new mongoose.model("Users", registrationSchema)

module.exports = Users