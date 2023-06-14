const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RateSchema = new mongoose.Schema({
    rate: Number,
    text: String,
    blogId: {type: Schema.Types.ObjectId, ref: 'blog'},
    authorId: {type: Schema.Types.ObjectId, ref: 'userof'},
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('rate', RateSchema)