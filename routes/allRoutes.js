const express = require("express")
const router = express.Router()
const {registerationFxn,loginFxn,authFxn} = require('../controllers/authCtrls')
const  {quizFxn} = require('../controllers/quizCtrls')
const { validateLogin }= require("../middleware/loginValidation")
const {validateRegistration}= require("../middleware/registrationValidation")
const {validateQuiz}= require("../middleware/quizValidation")



router.post('/registeration',validateRegistration, registerationFxn)
router.post('/login', validateLogin, loginFxn)
router.post("/auth",authFxn)
router.post("/quiz", validateQuiz, quizFxn)


module.exports = router