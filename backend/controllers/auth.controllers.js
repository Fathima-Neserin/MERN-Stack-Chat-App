const bcrypt = require("bcryptjs");
const User = require("../models/user.models");
const generateTokenAndSetCookie = require("../utils/generateToken")

exports.signup = async(req,res) => {
    try {
        const { fullName , userName , password , confirmPassword , gender } = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords are do not matching"})
        }
        const user = await User.findOne({userName});
        if(user){
            return res.status(400).json({error:"User already exists"})
        }
        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`
    
        const newUser = await User.create({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic:gender === "male" ? boyProfilePic  : girlProfilePic
        })
        if(newUser){
            // Generate JWT token
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic,
                message:`${userName}, signed in successfully`
        })
       
        }else{
            res.status(400).json({error:"Invalid user data"});
        }
    } catch (error) {
        console.error("Error in signup:", error.message);
        res.status(500).json({error:"Internal Server Error"})        
    }
    
}

exports.login = async(req,res) => {
    try {
        const { userName , password } = req.body;
        const user = await User.findOne({userName});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "" )
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid Username or Password "})
        }
        const accessToken = generateTokenAndSetCookie(user._id,res);

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic,
            message:`${userName}, logged in successfully`,
            token: accessToken || "Token generation failed"
    })

    } catch (error) {
        console.error("Error in login:", error.message);
        res.status(500).json({error:"Internal Server Error"}) 
    }
    
}

exports.logout = (req,res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.error("Error in logout:", error.message);
        res.status(500).json({error:"Internal Server Error"}) 
    }
    
}