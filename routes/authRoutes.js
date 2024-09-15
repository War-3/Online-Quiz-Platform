const express = require("express")
const router = express.Router()
const {registerationFxn,
        loginFxn,
        authFxn,
        quizFxn,
        } = require('../controllers/authCtrls')
const {validateRegistration,validateLogin, validateQuiz}= require("../middleware/validationMiddleware")



router.post('/registeration',validateRegistration, registerationFxn)
router.post('/login', validateLogin, loginFxn)
router.post("/auth",authFxn)
router.post("/quiz", validateQuiz, quizFxn)


module.exports = router