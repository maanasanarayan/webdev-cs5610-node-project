import mongoose from "mongoose";

const stocksSchema = mongoose.Schema({
    title: {type: String, required: true},
    likes: {type: Number, default: 0},
    liked: {type: Boolean, default: false},
    dislikes: Number,
    disliked: {type: Boolean, default: false},
    rating: String,
}, {collection: 'stocks'})

export default stocksSchema