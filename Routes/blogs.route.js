const express = require("express")
const { blogsModel } = require("../Models/blogs.model")
const blogsRouter=express.Router()

blogsRouter.get("/",async (req,res)=>{
    let {userID}=req.body
try {
    
    let data = await blogsModel.find({_id:userID})
    res.status(200).send({data})
} catch (error) {
    res.status(500).send({"msg":error.message})
}



})

// blogsRouter.get("/?",async (req,res)=>{
//     let {}
// try {
    
//     let data = await blogsModel.find({_id:userID})
//     res.status(200).send({data})
// } catch (error) {
//     res.status(500).send({"msg":error.message})
// }



// })



blogsRouter.post("/add",async (req,res)=>{
    
try {
    
    let data = new blogsModel(req.body)
    await data.save()
    res.status(200).send({"msg":"Blog posted Successfully"})
} catch (error) {
    res.status(500).send({"msg":error.message})
}



})
blogsRouter.patch("/:id",async (req,res)=>{
    
try {
    
    let data = await blogsModel.findByIdAndUpdate({_id:id},req.body)
    res.status(200).send({"msg":"Data updated Successfully"})
} catch (error) {
    res.status(500).send({"msg":error.message})
}



})
blogsRouter.delete("/:id",async (req,res)=>{

try {
    
    let data = await blogsModel.findByIdAndDelete({_id:id})
    res.status(200).send({"msg":"Blog Successfully deleted"})
} catch (error) {
    res.status(500).send({"msg":error.message})
}



})
module.exports={
    blogsRouter
}


