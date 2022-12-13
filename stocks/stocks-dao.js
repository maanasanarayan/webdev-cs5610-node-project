import moviesModel from "./stocks-model.js";
import stocksModel from "./stocks-model.js";


export const findAllStocks = async () => {
    const movies = await stocksModel.find()
    return movies
}
export const createStock = async (stock) => {
    const actualInsertedStock = await moviesModel.create(stock)
    return actualInsertedStock
}
export const deleteStock = async (sid) => {
    const status = await moviesModel.deleteOne({_id: sid})
    return status
}
export const updateMovie = () => {}
