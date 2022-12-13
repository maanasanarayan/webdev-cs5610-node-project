import express from 'express';
import mongoose from 'mongoose'
import cors from 'cors'
import UsersController from "./users/users-controller.js";
const app = express();

app.use(express.json());

app.use(cors());

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));



const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";


mongoose
  .connect('mongodb+srv://hkvin4:test@cluster0.z1gabtc.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));


  UsersController(app)

app.listen(4000, () => {
  console.log("Server Started");
});


