const express = require("express")
const userRouter=express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userModel } = require("../Models/user.model");
const { usermiddleware } = require("../Middlewares/authmiddleware");



userRouter.post("/register",async (req,res)=>{

let {username,avatar,email,password}=req.body

try {
    let findemail = await userModel.find({username,email})
   if(findemail.length>0){
res.status(500).send({"msg":"User Already Exist"})
   }else{
    bcrypt.hash(password, 5, async function(err, hash) {
        
        let newuser = new userModel({username,avatar,email,password:hash}) 
        await newuser.save()
        let user =  await userModel.find({email})
        res.status(200).send({"msg":"User Registered Successfully",userdetails:user})
    });

   }
    
} catch (error) {
res.status(500).send({"msg":error.message})
    
}



})
userRouter.post("/login",async (req,res)=>{

let {username,avatar,email,password}=req.body

try {
    let findemail = await userModel.find({email})
    let hashpass=findemail[0].password
    bcrypt.compare(password, hashpass, function(err, result) {
        if(result){
            res.status(200).send({"msg":"User logged in Succssfully",userdetails:findemail,token:jwt.sign({ userID: findemail[0]._id }, 'user')})
        }else{ 
            res.status(500).send({"msg":"User Not Found"})
        }
    });

   
    
} catch (error) {
res.status(500).send({"msg":error.message})
    
}



})


userRouter.patch("/:id",usermiddleware,async (req,res)=>{

let {id} = req.params
let {current_password,new_password}=req.body

try {
let findemail= await userModel.findById({_id:id})
console.log(findemail)
let hashpass=findemail.password
    bcrypt.compare(current_password, hashpass, function(err, result) {
        if(result){
            bcrypt.hash(new_password, 5, async function(err, hash) {
        
                await userModel.findByIdAndUpdate({_id:id},{password:hash}) 
                
                res.status(200).send({"msg":"Password Changed Successfully",token:jwt.sign({ userID: findemail._id }, 'user')})
            });
            
        }else{ 
            res.status(500).send({"msg":"User Not Found"})
        }
    });

    

} catch (error) {
res.status(500).send({"msg":error.message})
    
}

})





module.exports={
    userRouter
}


