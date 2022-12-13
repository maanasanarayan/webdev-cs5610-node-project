import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
    address:String,
    phonenumber:String,
    dob: String,
    gender:String,
    role:String,
  },
  {
    collection: "UserInfo",
  }
);

export default userSchema