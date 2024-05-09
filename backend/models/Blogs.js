const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = require('./User')

const Blogs = new Schema({
    user_id :{
        type: Schema.Types.ObjectId,
        ref: User.UserSchema
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        default: "General"
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }

})

module.exports.BlogsSchema = mongoose.model('blogs', Blogs);