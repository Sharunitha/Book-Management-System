const express=require('express')
const bcrypt=require('bcrypt')
const Student=require('../models/Student')
const router=express.Router();
const verifyAdmin=require('./auth')


const validatePassword = (password) => {
    // Check length
    if (password.length < 8) {
        return false;
    }

    // Check for at least one uppercase letter, one lowercase letter, one digit, and one special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/;
    return regex.test(password);
};
router.post('/register',verifyAdmin,async(req,res)=>{
    try{
        const {roll,username,grade,password}=req.body;
        if (!username || !roll || !grade ||!password) {
            return res.json({ message: "All fields are required"});
        }
        if (!validatePassword(password)) {
            return res.json({ message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character" });
        }
        const student=await Student.findOne({username});
        if(student){
            return res.json({message:"student is registered"})
        }
        const hashPassword=await bcrypt.hash(password,10)
        const newStudent=new Student({
            roll:roll,
            username:username,
            grade:grade,
            password:hashPassword
        })
        await newStudent.save()
        return res.json({registered:true})
    }catch(err){
        return res.json({message:"Error in registering student"})
    }
})
module.exports=router;