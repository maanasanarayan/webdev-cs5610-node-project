import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import cors from "cors";
import LikesController from "./likes/likes-controller.js";
import UsersController from "./users/users-controller.js";
import StocksController from "./stocks/stock-controller.js";
import CommentsController from "./comments/comments-controller.js";
<<<<<<< HEAD
import BookMarksController from "./bookmarks/bookmarks-controller.js"
=======
import e from "express";
>>>>>>> 319bdde8f45ebd9d381c3ad1d323aa179c0db00a

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

// mongoose.connect("mongodb://localhost:27017/cs5610-fa22", options);
mongoose
  .connect(
    "mongodb+srv://hkvin4:test@cluster0.z1gabtc.mongodb.net/?retryWrites=true&w=majority",
    options
  )
  .catch((error) => {
    console.log("Error thrown while trying to connect to db", error);
    throw error;
  });
let sess = {
  secret: "Secret",
  resave: false,
  saveUninitialized: true,
};
const app = express();
app.use(cors());
app.use(session(sess));
app.use(express.json());
StocksController(app);
LikesController(app);
UsersController(app);
CommentsController(app);
BookMarksController(app);
app.listen(4000);
console.log("Listening at 4000");
