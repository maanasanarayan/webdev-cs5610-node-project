import mongoose from "mongoose";
import stockSchema from "./stocks-schema";

const stocksModel = mongoose.model('StocksModel', stockSchema)

export default stocksModel