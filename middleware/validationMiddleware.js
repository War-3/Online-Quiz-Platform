const { check, validationResult } = require('express-validator');

        
// Validate Registrstion
const validateRegistration = [
  
  check('firstName')
    .notEmpty().withMessage('First Name is required'),
    check('lastName')
    .notEmpty().withMessage('Last Name is required'),
  
  check('email')
    .isEmail().withMessage('Invalid email format')
    .notEmpty().withMessage('Email is required'),
  
  check('password')
    .isLength({ min: 8 }).withMessage('Minimum of 8 characters required for password')
    .notEmpty().withMessage('Password is required'),


  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  }
];



// Validate Login
const validateLogin = [
  
  check('email')
    .isEmail().withMessage('Invalid email format')
    .notEmpty().withMessage('Email is required'),
  
  check('password')
    .isLength({ min: 8 }).withMessage('Minimum of eight characters required for password')
    .notEmpty().withMessage('Password is required'),


    (req, res, next) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      next();
    }
]



// Validation rules for the quiz answers
const quizValidation = async(req, res, next)=>{
  const { category, userId, quizId, quizAns} =req.body
  const wans ="Incorrect!"
  const rAns = "Correct!"
 

 
  if(quizAns.quizAns_1 =="A"){
    quizAns.quizAns_1= rAns
  }else{
    quizAns.quizAns_1=wans
  }   
  
  if(quizAns.quizAns_2 =="D"){
    quizAns.quizAns_2= rAns
   }else{
    quizAns.quizAns_2=wans
   } 

   if(quizAns.quizAns_3 =="C"){
    quizAns.quizAns_3= rAns
   }else{
    quizAns.quizAns_3=wans
   } 

   if(quizAns.quizAns_4 =="A"){
    quizAns.quizAns_4= rAns
   }else{
    quizAns.quizAns_4=wans
   } 

   if(quizAns.quizAns_5 =="B"){
    quizAns.quizAns_5= rAns
   }else{
    quizAns.quizAns_5=wans
   } 

   if(quizAns.quizAns_6 =="C"){
    quizAns.quizAns_6= rAns
   }else{
    quizAns.quizAns_6=wans
   }  

   if(quizAns.quizAns_7 =="D"){
    quizAns.quizAns_7= rAns
   }else{
    quizAns.quizAns_7=wans
   } 
  
   if(quizAns.quizAns_8 =="C"){
    quizAns.quizAns_8= rAns
   }else{
    quizAns.quizAns_8=wans
   } 

   if(quizAns.quizAns_9 =="C"){
    quizAns.quizAns_9= rAns
   }else{
    quizAns.quizAns_9=wans
   } 
   if(quizAns.quizAns_10 =="A"){
    quizAns.quizAns_10= rAns
   }else{
    quizAns.quizAns_10=wans
   } 
   
  next()
}





module.exports = {
  validateRegistration,
  validateLogin,
  quizValidation,
}
    
    
   
    