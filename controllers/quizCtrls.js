// a  Quiz Model that accept 10 questions with 4 options answers and one correct answer
const Quiz  = require ('../models/quizModel')

exports.quizFxn = async (req, res, next) => {
    try {
      const { userId, phoneNumber,category, samplesQuiz } = req.body;

      const incorrectMsg ="Incorrect!"
      const correctMsg  = "Correct!"
      const correctAnswers = ['A','B','D','A','D','C','C','B','B','D']  


      // Map through samplesQuiz and update the userAnswer based on correctness
      samplesQuiz.forEach((quiz, index) => {
      quiz.userAnswer = quiz.userAnswer === correctAnswers[index] ? correctMsg : incorrectMsg;
      });
            
        
      // Check if the user has already submitted based on `userId` or `phoneNumber`
      const exisitingUserId = await Quiz.findOne({ "userId": {
        $elemMatch: {  firstName: `${userId[0].firstName}` }
      } });

     if (exisitingUserId) {
       return res.status(404).json({ message: "You have already Submitted!" });
     }
     
const exisitingUser = await Quiz.findOne({ phoneNumber });

if (exisitingUser) {
  return res.status(404).json({ message: "You have already Submitted!" });
}


const newUser = new Quiz ({ userId, phoneNumber,category, samplesQuiz} )

await newUser.save()


    // Calculate the total number of correct answers
const correctAns = samplesQuiz.filter(item => item.userAnswer === correctMsg).length;


let feedback = " "
if(correctAns >=5){
feedback ="Passed"
}else{
feedback = "Failed! Sorry you won't proceed to next stage of Program"
}

// Return the result
return res.status(200).json({
  message: "You have completed your exam",
  newUser,
  totalGrade: `${correctAns}/10`,
  feedback
});
} catch (error) {
return res.status(500).json({
    message: error.message
})
}
next()
};