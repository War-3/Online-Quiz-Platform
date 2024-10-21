const Quiz = require('../models/quizModel');

exports.quizFxn = async (req, res, next) => {
  try {
    const { userId, phoneNumber, category, samplesQuiz } = req.body;

    const incorrectMsg = "Incorrect!";
    const correctMsg = "Correct!";
    const correctAnswers = ['A', 'B', 'D', 'A', 'D', 'C', 'C', 'B', 'B', 'D'];

    // Update each quiz item with the user's result
    samplesQuiz.forEach((quiz, index) => {
      const isCorrect = quiz.userAnswer === correctAnswers[index];
      quiz.result = {
        selectedOption: quiz.userAnswer,
        message: isCorrect ? correctMsg : incorrectMsg,
      };
    });

    // Check if the user has already submitted using `userId` or `phoneNumber`
    const existingUserId = await Quiz.findOne({
      userId: { $elemMatch: { firstName: userId[0].firstName } },
    });

    if (existingUserId) {
      return res.status(400).json({ message: "You have already submitted!" });
    }

    const existingUserPhone = await Quiz.findOne({ phoneNumber });

    if (existingUserPhone) {
      return res.status(400).json({ message: "You have already submitted!" });
    }

    // Save the new user and quiz submission
    const newUser = new Quiz({ userId, phoneNumber, category, samplesQuiz });
    await newUser.save();

    // Calculate the total number of correct answers
    const correctAns = samplesQuiz.filter(
      (item, index) => item.userAnswer === correctAnswers[index]
    ).length;

    // Determine feedback based on score
    let feedback = correctAns >= 5 
      ? "Passed" 
      : "Failed! Sorry, you won't proceed to the next stage of the program.";

    // Return the result
    return res.status(200).json({
      message: "You have completed your exam.",
      newUser,
      totalGrade: `${correctAns}/10`,
      feedback,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
