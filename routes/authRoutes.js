const express = require("express")
const router = express.Router()
const {registerationFxn,
        loginFxn,
        authFxn,
        quizFxn,
        } = require('../controllers/authCtrls')
const {validateRegistration,validateLogin, quizValidation}= require("../middleware/validationMiddleware")



router.post('/registeration',validateRegistration, registerationFxn)
router.post('/login', validateLogin, loginFxn)
router.post("/auth",authFxn)
router.post("/quiz", quizFxn)


module.exports = router