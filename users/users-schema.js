import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    fname: {type: String, unique: true, required: true},
    lname: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: { type: String, unique: true },
    address:String,
    phonenumber:String,
    dob:String,
    gender:String,
    role: {type: String, enum: ['INDUSTRY', 'TRADER', 'admin']}
}, {collection: 'users'})

export default usersSchema
