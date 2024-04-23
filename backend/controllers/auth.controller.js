import User from "../models/user.models.js";
import bcrypt from "bcryptjs";


export const signup = async(req,res)=>{
   try{
     const {fullName,username,password,confirmPassword, gender}= req.body;
    
     if(password!==confirmPassword){
      return res.status(400).json({error:"Wrong Password"})
     }
     const user= await User.findOne({username});
     if(user){
      return res.status(400).json({error:"Username already exists"})
     }
      //Passwrod Hashing
      const salt= await bcrypt.genSalt(10);
      const hashedPassword= await bcrypt.hash(password,salt);

      //https://avatar-placeholder.iran.liara.run/ api link to profile pics

      const boyProfilePicture= `https://avatar-placeholder.iran.liana.run/public/boy?username=${username}`
      const girlProfilePicture= `https://avatar-placeholder.iran.liana.run/public/girl?username=${username}`
      
       const newUser= new User({
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === 'male' ? boyProfilePicture : girlProfilePicture
       })

       if(newUser){
        await newUser.save();

       res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.ProfilePic
         });
       } else{
        res.status(400).json({error: "Invalid user Data"})
       }
    
    }catch(error){
         console.log("Error in signup controller". error.message)
         res.status(500).json({error:"Internal server error"})
   }
};
export const login =(req,res)=>{
    res.send("loginUser");
};
export const logout =(req,res)=>{
    console.log("logoutUser");
};
