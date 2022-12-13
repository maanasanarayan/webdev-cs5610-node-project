import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: { type: String, unique: true },
    address:String,
    role: {type: String, enum: ['INDUSTRY', 'TRADER', 'ADMIN']}
}, {collection: 'users'})

export default usersSchema