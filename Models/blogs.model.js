const mongoose = require('mongoose')


const blogSchema = mongoose.Schema({

    username: String,
    title: String,
    content: String,
    category: String,
    date: String,
    likes: Number,
    comments: Array
})

const blogsModel = mongoose.model('blogsdata', blogSchema)


module.exports = {
    blogsModel
}