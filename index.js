const express = require("express")
const app = express()
const cors = require("cors")
const mongoose=require("mongoose")
const { userRouter } = require("./Routes/user.routes")
const { blogsRouter } = require("./Routes/blogs.route")
const { usermiddleware } = require("./Middlewares/authmiddleware")
app.use(cors())
app.use(express.json())
require("dotenv").config()


app.use("/user",userRouter)
app.use("/blogs",usermiddleware,blogsRouter)



app.listen(process.env.port,()=>{

mongoose.connect(process.env.url).then(()=>{
    console.log('mongo is connected')
}).catch(()=>{
    console.log("mongo is not connected")
})
console.log('app is connected')

})