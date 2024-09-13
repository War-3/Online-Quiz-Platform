const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const quizArray  = require ('../models/quizModel')
const Users= require ('../models/UserRegModel')


const validEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const registerationFxn = async (req, res, next)=>{
    try {
        const {name, email, password, state, phoneNumber} = req.body
        
        const errors = []

        if(!email){
          errors.push("Please add your email")
      } else if(!validEmail(email)){
          errors.push("Email format is incorrect")
      }

  if(password.length < 8){
      errors.push("Minimum of eight characters required for password.")
  }

  if(errors.length > 0){
      return res.status(400).json({message: errors})
  }

    const exisitingUser = await Users.findOne({ email });

  if (exisitingUser) {
    return res.status(400).json({ message: "Email already registered!" });
  }
 


    const hashedpassword = await bcrypt.hash(password,8)


    const newUser = new Users ({ name, email, password: hashedpassword, state,phoneNumber});
   
    await newUser.save()
    
    return res.status(200).json({
        message: "Registration Successful",
        user: newUser
    });
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    next()
};




const loginFxn = async (req, res, next)=>{
    try {
      const {email, password} = req.body
      
  const errors = []

  if(!email){
      errors.push("Please add your email")
  } else if(!validEmail(email)){
      errors.push("Email format is incorrect")
  }

  if(!password){
      errors.push("Please add your password")
  }

  if(errors.length > 0){
      return res.status(400).json({message: errors})
  }

  
    const user = await Users.findOne({email});
   
    if(!user){
        return res.status(400).json({
            message: "User Account not found"
        });
    }
        
    const paswdCheck = await bcrypt.compare(password, user.password)
    if(!paswdCheck){
        return res.status(400).json({message: "Incorrect Password or email"});
    }




    const accesstoken = jwt.sign({user},`${process.env.ACCESS_TOKEN}`,{expiresIn: "2m"})

    const refreshtoken = jwt.sign({user},`${process.env.REFRESH_TOKEN}`,{expiresIn: "1d"})
    return res.status(200).json({
        message: "Login Successful",
        accesstoken,
        refreshtoken,
        user});

        
    } catch (error) {
        return res.status(500).json({message: error.message})
        
    }
    next()
};


const authFxn = async (req, res, next)=>{
    try {
      const tk = req.header("Authorization")

      if(!tk){
          return res.status(401).json({message: "Access Denied!"})
      }

      const tkk = tk.split(" ")
  
      const token = tkk[1]
  
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)

      if(!decoded){
          return res.status(401).json({message: "Invalid Login details"})
      }

      const user = await Users.findOne({email: decoded.user.email})

      if(!user){
          return res.status(404).json({message: "User account not found!"})
      }
  
      req.user = user

      
        return res.status(200).json({
            message: "Successful",
            user: req.user
          })
    } catch (error) {
        return res.status(500).json({message: error.message});
    }

    next()
  };


  const quizFxn = async (req,res, next)=>{
    
    try {
        const { category, userId, quizId, quizAns} =req.body
        const wans ="Incorrect!"
  const rAns = "Correct!"
  let totalcorrect = 0

 
  if(quizAns[0].ans =="A"){
     quizAns[0].ans= rAns
  }else{
      quizAns[0].ans=wans
  }   
  
  if(quizAns[1].ans =="D"){
      quizAns[1].ans= rAns
   }else{
       quizAns[1].ans=wans
   } 

   if(quizAns[2].ans =="C"){
      quizAns[2].ans= rAns
   }else{
       quizAns[2].ans=wans
   } 

   if(quizAns[3].ans =="A"){
      quizAns[3].ans= rAns
   }else{
       quizAns[3].ans=wans
   } 

   if(quizAns[4].ans =="B"){
      quizAns[4].ans= rAns
   }else{
       quizAns[4].ans=wans
   } 

   if(quizAns[5].ans =="C"){
      quizAns[5].ans= rAns
   }else{
       quizAns[5].ans=wans
   }  

   if(quizAns[6].ans =="D"){
      quizAns[6].ans= rAns
   }else{
       quizAns[6].ans=wans
   } 
  
   if(quizAns[7].ans =="C"){
      quizAns[7].ans= rAns
   }else{
       quizAns[7].ans=wans
   } 

   if(quizAns[8].ans =="C"){
      quizAns[8].ans= rAns
   }else{
       quizAns[8].ans=wans
   } 
   if(quizAns[9].ans =="A"){
      quizAns[9].ans= rAns
   }else{
       quizAns[9].ans=wans
   } 
   
     
        const exisitingUser = await quizArray.findOne({ userId });

        if (exisitingUser) {
          return res.status(404).json({ message: "You have Submitted!" });
        }

        const newUser = new quizArray ({ category, userId, quizId, quizAns})
    
        await newUser.save()
          
        
       const correctAns = quizAns.filter(item=>item.ans==="Correct!").length
       let feedback = " "
       if(correctAns >=5){
        feedback ="Passed"
      }else{
        feedback = "Failed! Sorry you won't proceed to next stage of Program"
       }
    //    
        return res.status(200).json({ message: "You have completed your exam", newUser,totalGrade: correctAns + "/10", feedback })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
    next()
  };


  module.exports = 
  {
    registerationFxn,
    loginFxn,
    authFxn,
    quizFxn,
    validEmail,
  }