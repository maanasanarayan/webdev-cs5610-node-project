
import * as likesDao from "./likes-dao.js";
import {findUsersThatLikeStock, userLikesStock, userUnlikesStock} from "./likes-dao.js";

const LikesController = (app) => {
    const userLikesMovie = async (req, res) => {
        // const uid = req.params.uid
        const uid = req.session['currentUser']._id
        const sid = req.params.sid

        const newLike = await likesDao.userLikesStock(uid, sid)
        // likes.push(newLike)
        res.json(newLike)
    }
    const userUnlikesMovie = async (req, res) => {
        const {uid, sid} = req.params

        const status = await likesDao.userUnlikesStock(uid, sid)

        // likes = likes.filter((l) => l.user !== uid && l.movie !== mid)
        res.send(status)
    }
    const findAllLikes = async (req, res) => {
        const likes = await likesDao.findAllLikes()
        res.json(likes)
    }
    const findStocksLikedByUser = async (req, res) => {
        const uid = req.params.uid
        const stocks = await likesDao.findStocksLikedByUser(uid)
        res.json(stocks)
        // const movies = likes.filter((like) => like.user === uid)
        // const populatedMovies = populate({
        //     rawResults: movies,
        //     fieldToPopulate: 'movie',
        //     sourceData: getMovies(),
        //     sourceField: '_id'
        // })
        // res.json(populatedMovies)
    }
    const findUsersWhoLikedMovie = async (req, res) => {
        const sid = req.params.sid
        const users = await likesDao.findUsersThatLikeStock(sid)
        res.json(users)

        // const usersWhoLikeMovie = likes.filter((like) => like.movie === mid)
        // const populateUsers = populate({
        //     rawResults: usersWhoLikeMovie,
        //     fieldToPopulate: 'user',
        //     sourceData: users,
        //     sourceField: '_id'
        // })
        // res.json(populateUsers)
    }

    app.post('/users/likes/:sid', userLikesStock)
    app.delete('/users/unlikes/:sid', userUnlikesStock)
    app.get('/likes', findAllLikes)
    app.get('/users/:uid/likes', findStocksLikedByUser)
    app.get('/movies/:sid/likes', findUsersThatLikeStock)
    // app.put(updateLike)
}

export default LikesController;