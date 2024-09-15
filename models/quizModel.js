const mongoose = require('mongoose')

const userIdSchema = new mongoose.Schema(
    {
        firstName: {type: String},
        lastName:{type: String},
        state: {type: String}
})


const quizSchema = new mongoose.Schema(
    {
        quiz_1: {type: String},
        quiz_2: {type: String},
        quiz_3: {type: String},
        quiz_4: {type: String},
        quiz_5: {type: String},
        quiz_6: {type: String},
        quiz_7: {type: String},
        quiz_8: {type: String},
        quiz_9: {type: String},
        quiz_10: {type: String},
    })
    const quizAnsSchema = new mongoose.Schema(
        {
            quizAns_1: {type: String},
            quizAns_2: {type: String},
            quizAns_3: {type: String},
            quizAns_4: {type: String},
            quizAns_5: {type: String},
            quizAns_6: {type: String},
            quizAns_7: {type: String},
            quizAns_8: {type: String},
            quizAns_9: {type: String},
            quizAns_10: {type: String},
            
        })
   
    const quizArraySchema = new mongoose.Schema(
        {
            userId: [userIdSchema],
            phoneNumber: {type: Number, require: true},
            category: {type: String},
            quizId:{type: String},
            quiz:[quizSchema],
            quizAns:[quizAnsSchema]
        });


const  quizArray = new mongoose.model('quizArray',quizArraySchema)


module.exports = quizArray

