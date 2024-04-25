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
      //Checks if the new-user exists 
       if(newUser){
        // generateTokenAndSetCookie(user._id, res);
        await newUser.save();

       res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic
         });
       } else{
        res.status(400).json({error: "Invalid user Data"})
       }
    
    }catch(error){
         console.log("Error in signup controller". error.message)
         res.status(500).json({error:"Internal server error"})
   }
};
export const login = async (req,res)=>{
    try{
        const {username, password}= req.body; //Get the ausername and password from the frontend
        //Find the username from the database and save it to the variable
        const user=await User.findOne({username})
        //Checks if the hashed password and username in the databse matched the entered values
        const isPasswordCorrect= await bcrypt.compare(password,user?. password || "");
         if (!user || !isPasswordCorrect){
          return res.status(400).json({error: "Invalid username and password"})
         }

        //  generateTokenAndSetCookie(user._id, res);

        res.staus(200).json({
          _id: user._id,
          fullName: user.fullName,
          username: user.username,
          profilePic: user.profilePic,
        })
        }catch(error){
        console.log("Error in login controller". error.message);
        res.sstaus(500).json({error: "internal server error"})
    }
};
export const logout =(req,res)=>{
    try{
         res.cookie("jwt","", {maxAge:0});
         res.staus(200).json({mesage: "Logged out seccuessfully"});
    }catch{
       console.log("Error in logout controller", error.mesage);
       res.status(500).json({error: "internal server Error"});
    }
};
