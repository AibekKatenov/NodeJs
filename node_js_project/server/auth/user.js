const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    email: String,
    full_name: String,
    password: String,
    isAdmin: Boolean,
    toRead: [{type: Schema.Types.ObjectId, ref: 'blog'}],
    readAlready: [{type: Schema.Types.ObjectId, ref: 'blog'}]
})

module.exports = mongoose.model('userof', userSchema)