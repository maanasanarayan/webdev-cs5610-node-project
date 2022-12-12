import mongoose from "mongoose";

const User = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    dob: Date,
    type: {type: String, enum: ['ACTOR', 'CRITIC', 'FAN', 'DIRECTOR']},
    married: Boolean
}, {collection: 'user-data'})

const model = mongoose.model('UserData', User)

export default model
