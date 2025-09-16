const Quiz = require('../models/quizModel');
const fetch = require("node-fetch");

exports.quizFxn = async (req, res, next) => {
  try {
    const { userId, phoneNumber, category, samplesQuiz } = req.body;

    const incorrectMsg = "Incorrect!";
    const correctMsg = "Correct!";
    const correctAnswers = ['A', 'B', 'D', 'A', 'D', 'C', 'C', 'B', 'B', 'D'];

    // Add result messages to each quiz item
    samplesQuiz.forEach((quiz, index) => {
      const isCorrect = quiz.userAnswer === correctAnswers[index];
      quiz.result = {
        selectedOption: quiz.userAnswer,
        message: isCorrect ? correctMsg : incorrectMsg,
      };
    });

    // Check if user already submitted
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

    // Function to get address from coordinates
    async function getAddressFromCoordinates(lat, lon) {
      const accessKey = "205dd3a091641db4f39acb51f53a6982"; // Replace with your API key
      const url = `https://api.positionstack.com/v1/reverse?access_key=${accessKey}&query=${lat},${lon}`;
      
      const response = await fetch(url);
      const data = await response.json();
  
      if (data && data.data && data.data.length > 0) {
        return data.data[0].label; // Full address
      } else {
        return "No address found for these coordinates.";
      }
    }

    // Fetch address
    const fullAddress = await getAddressFromCoordinates(6.6778, 3.1654);
    console.log("Full Address:", fullAddress);

    // Save the new quiz submission
    const newUser = new Quiz({ userId, phoneNumber, category, samplesQuiz });
    await newUser.save();

    // Count correct answers
    const correctAns = samplesQuiz.filter(
      (item, index) => item.userAnswer === correctAnswers[index]
    ).length;

    // Feedback
    let feedback = correctAns >= 5 
      ? "Passed" 
      : "Failed! Sorry, you won't proceed to the next stage of the program.";

    // Response
    return res.status(200).json({
      message: "You have completed your exam.",
      newUser,
      totalGrade: `${correctAns}/10`,
      feedback,
      fullAddress
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
