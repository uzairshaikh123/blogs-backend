const express = require("express")
const blogsRouter=express.Router()

blogsRouter.get("/",(req,res)=>{
res.send("end")
})
module.exports={
    blogsRouter
}


