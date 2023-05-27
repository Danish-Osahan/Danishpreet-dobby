import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js'


export const signup=async (req,res)=>{
    const {email,password,confirmpassword,firstname,lastname}=req.body
  
    try {
      const exsistingUser=await User.findOne({email})
      if(exsistingUser) return   res.status(400).json({message:'User already Exsists'})
  
      if(password!==confirmpassword)  return res.status(400).json({message:"Password Don't Match"})
  
      const hashedPassword=await bcrypt.hash(password,12)
  
      const result =await User.create({email,password: hashedPassword, name:`${firstname} ${lastname}`})
      const token=jwt.sign({email:result.email,id:result._id},'Danish',{expiresIn:'1h'})
      res.status(200).json({
        _id:result._id,
        name:result.name,
        email:result.email,
        token:token
      })  
    } catch (error) {
      // console.log(error)
      res.status(500).json({message:'Something went wrong'})
    }
  }


export const signin =async (req,res)=>{
    const {email,password}=req.body;

  try {
    const exsistingUser=await User.findOne({email})
    if(!exsistingUser) return res.status(400).json({message:"Email not found"});

    const isPassword= await bcrypt.compare(password,exsistingUser.password)
    if(!isPassword) return res.status(400).json({message:"Password mismatch"})

    const token=jwt.sign({email:exsistingUser.email,id:exsistingUser._id},'Danish',{expiresIn:'1h'})

    res.status(200).json({_id:exsistingUser._id,
      email:exsistingUser.email,
      name:exsistingUser.name,
      token:token
      
    })
  } catch (error) {
    res.status(500).json({message:'Something went wrong'})
    console.log(error)
  }

}  