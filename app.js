import express from 'express'
import cors from 'cors'
import LikesController from "./likes/likes-controller";
import UsersController from "./users/users-controller";
import StockController from "./stocks/stock-controller";
import CommentsController from "./comments/comments-controller"
import mongoose from "mongoose";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}

mongoose.connect('mongodb://localhost:27017/cs5610-fa22', options);

const app = express();
app.use(cors())
app.use(express.json())
StockController(app)
LikesController(app)
UsersController(app)
CommentsController(app)
app.listen(4000)