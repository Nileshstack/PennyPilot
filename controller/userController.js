
const userModel = require("../models/userModel.js"); 



const loginController=async(req,res)=>{
     try{
    const {email, password}=req.body
    const user= await userModel.findOne({email,password})
    if(!user){
        res.status(401).json({
            success:false,
            message:'Invalid credentials',
        })
    }
    res.status(200).json({
            success:true,
            message:'Login Sucessfull!',
            user
        })
     }catch(error){
        res.status(400).json({
            success:false,
            message:'Error in login controller',
            error
        })
     }
}

const registerController=async(req,res)=>{
     try{
      const newUser = new userModel(req.body)
      await newUser.save()
      res.status(200).json({
        success:true,
        message:'New User Created Succesfully',
        newUser
      })
     }catch(error){
        res.status(400).json({
            success:false,
            message:'Error in register controller',
            error:error.message
        })
     }
}
module.exports={loginController,registerController}