const mongoose = require('mongoose')

const userIdSchema = new mongoose.Schema(
    {
        firstName: {type: String, require: true},
        lastName:{type: String, require: true},
        state: {type: String,  require: true}
})

    const quizSchema = new mongoose.Schema({
            userId: [userIdSchema],
            phoneNumber: {type: Number, require: true},
            category: String, 
            quizId: String,
            samplesQuiz: [
                {
                    question: String,
                    options: {               
                        A: String,
                        B: String,
                        C: String,
                        D: String
                        },
            userAnswer: {  type: String, require: true }
                    }]
                
});


const  Quiz = new mongoose.model('Quiz',quizSchema)


module.exports = Quiz

