import mongoose from "mongoose";
import CommentSchema from "./CommentSchema";

const CommentModel = mongoose.model("CommentModel", CommentSchema);

export default CommentModel;