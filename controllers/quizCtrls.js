const quizArray  = require ('../models/quizModel')



exports.quizFxn = async (req,res, next)=>{
    
    try {
        const { userId, phoneNumber, category, quizId, quiz, quizAns} =req.body

            const wans ="Incorrect!"
            const rAns = "Correct!"
           
          
           
            if(quizAns[0].quizAns_1 =="A"){
                quizAns[0].quizAns_1 = rAns
            }else{
                quizAns[0].quizAns_1=wans
            }   
            
            if(quizAns[0].quizAns_2 =="D"){
              quizAns[0].quizAns_2= rAns
             }else{
              quizAns[0].quizAns_2=wans
             } 
          
             if(quizAns[0].quizAns_3 =="C"){
              quizAns[0].quizAns_3= rAns
             }else{
              quizAns[0].quizAns_3=wans
             } 
          
             if(quizAns[0].quizAns_4 =="A"){
              quizAns[0].quizAns_4= rAns
             }else{
              quizAns[0].quizAns_4=wans
             } 
          
             if(quizAns[0].quizAns_5 =="B"){
              quizAns[0].quizAns_5= rAns
             }else{
              quizAns[0].quizAns_5=wans
             } 
          
             if(quizAns[0].quizAns_6 =="C"){
              quizAns[0].quizAns_6= rAns
             }else{
              quizAns[0].quizAns_6=wans
             }  
          
             if(quizAns[0].quizAns_7 =="D"){
              quizAns[0].quizAns_7= rAns
             }else{
              quizAns[0].quizAns_7=wans
             } 
            
             if(quizAns[0].quizAns_8 =="C"){
              quizAns[0].quizAns_8= rAns
             }else{
              quizAns[0].quizAns_8=wans
             } 
          
             if(quizAns[0].quizAns_9 =="C"){
              quizAns[0].quizAns_9= rAns
             }else{
              quizAns[0].quizAns_9=wans
             } 
             if(quizAns[0].quizAns_10 =="A"){
              quizAns[0].quizAns_10= rAns
             }else{
              quizAns[0].quizAns_10=wans
             } 
             
            
             const exisitingUserId = await quizArray.findOne({ "userId": {
                $elemMatch: {  firstName: `${userId[0].firstName}` }
              } });

             if (exisitingUserId) {
               return res.status(404).json({ message: "You have already Submitted!" });
             }
             
        const exisitingUser = await quizArray.findOne({ phoneNumber });

        if (exisitingUser) {
          return res.status(404).json({ message: "You have already Submitted!" });
        }
        

        const newUser = new quizArray ({ userId, phoneNumber, category, quizId, quiz, quizAns} )
    
        await newUser.save()
          
        const correctAns = quizAns.reduce((count, item) => {
            const correctCount = [
              item.quizAns_1,
              item.quizAns_2,
              item.quizAns_3,
              item.quizAns_4,
              item.quizAns_5,
              item.quizAns_6,
              item.quizAns_7,
              item.quizAns_8,
              item.quizAns_9,
              item.quizAns_10
            ].filter(answer => answer === "Correct!").length
            return count + correctCount;
        }, 0);
            
    //    const correctAns = quizAns.filter(item=>item.quizAns_1,==="Correct!").length
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

