const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const Users= require ('../models/UserRegModel')


exports.registerationFxn = async (req, res)=>{
    try {
        const {firstName,lastName, email, password} = req.body
      const exisitingUser = await Users.findOne({ email });

  if (exisitingUser) {
    return res.status(400).json({ message: "User already registered!" });
  }
 
    const hashedpassword = await bcryptjs.hash(password,8)

    const newUser = new Users ({ firstName,lastName, email, password: hashedpassword});
   
    await newUser.save()
    
    return res.status(200).json({
        message: "Registration Successful",
        user: newUser
    });
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
   
};




exports.loginFxn = async (req, res, next)=>{
    try {
      const {email, password} = req.body
      
   
    const user = await Users.findOne({email});
   
    if(!user){
        return res.status(400).json({
            message: "User Account not found"
        });
    }
        
    const paswdCheck = await bcryptjs.compare(password, user.password)
    if(!paswdCheck){
        return res.status(400).json({message: "Incorrect Password or email"});
    }

    const accesstoken = jwt.sign({user},`${process.env.ACCESS_TOKEN}`,{expiresIn: "10m"})

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


exports.authFxn = async (req, res, next)=>{
    try {
           
        // const tk = req.header("Authorization")
        const tk = req.headers.authorization

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

          
        // return res.status(200).json({
        //     message: "Successful",
        //     user: req.user
        //   })
        console.log("User authenticated:", req.user); // ✅ Debugging

        next(); // ✅ Now properly moves to next middleware
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
  };


