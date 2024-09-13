const express = require("express")
const {registerationFxn,
        loginFxn,
        authFxn,
        quizFxn,
        } = require('../controllers/authCtrls')

const router = express.Router()

router.post('/registeration',registerationFxn)
router.post('/login',loginFxn)
router.post("/auth",authFxn)
router.post("/quiz", quizFxn)


module.exports = router