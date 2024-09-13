const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema(
    {
        quiz: {type: String},
        ans: {type: String}
    })
   
    const quizArraySchema = new mongoose.Schema(
        {
            category: {type: String},
            userId: {type: String},
            quizId:{type: String},
            quizAns:[quizSchema]
        });


const  quizArray = new mongoose.model('quizArray',quizArraySchema)


module.exports = quizArray

