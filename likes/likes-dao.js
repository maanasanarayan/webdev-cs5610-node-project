import likesModel from "./likes-model.js";

export const userLikesStock = async (uid, sid) => {
    return await likesModel.create({user: uid, stock: sid})
}
export const userUnlikesStock = async(uid, sid) => {
    return await likesModel.deleteOne({user: uid, stock: sid})
}
export const findStocksLikedByUser = async(uid) => {
    return await likesModel
        .find({user: uid}, {user: false})
        .populate('stock', 'title')
        .exec()
}
export const findUsersThatLikeStock = async(mid) => {
    return await likesModel.find({stock: mid}, {stock: false})
        .populate('user', 'username')
        .exec()
}
export const findAllLikes = async () =>
    await likesModel.find()
