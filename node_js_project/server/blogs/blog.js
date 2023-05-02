const mongoose = require('mongoose')
const Schema = mongoose.Schema


const blogSchema = new mongoose.Schema({
    title: String,
    category: String,
    image: String,
    description: String,
    author: {type: Schema.Types.ObjectId, ref: 'user'}  
})

module.exports = mongoose.model('blog', blogSchema)
