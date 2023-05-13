const mongoose = require('mongoose')


const blogSchema = mongoose.Schema({
    username: String,
    Avatar: String,
    email: String,
    password: String
})

const blogsModel= mongoose.model("blogsdata",blogSchema)


module.exports={
    blogsModel
}