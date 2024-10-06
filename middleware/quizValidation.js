const { body, validationResult } = require('express-validator');

// Validate quiz
const validateQuiz = [
    body('userId').isArray().withMessage('User ID must be an array of user details'),
    body('phoneNumber').isString().withMessage('Phone number must be a string'),
    body('category').notEmpty().withMessage('Category is required'),
    body('samplesQuiz').isArray().withMessage('SamplesQuiz must be an array'),
    body('samplesQuiz.*.userAnswer').isString().withMessage('Each sample quiz must contain a userAnswer string'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];
  

  module.exports = { validateQuiz }