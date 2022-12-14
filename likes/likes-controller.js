
import * as likesDao from "./likes-dao.js";
import {
    countHowManyLikes,
    findUserLikesStock,
    findUsersThatLikeStock,
    userLikesStock,
    userUnlikesStock
} from "./likes-dao.js";

const LikesController = (app) => {
    const userLikesStock = async (req, res) => {
        // const uid = req.params.uid
        const uid = req.session['currentUser']._id
        const sid = req.params.sid

        const newLike = await likesDao.userLikesStock(uid, sid)
        // likes.push(newLike)
        res.json(newLike)
    }
    const userUnlikesStock = async (req, res) => {
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
    const findUsersThatLikeStock = async (req, res) => {
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

    const userTogglesStockLikes = async (req, res) => {
        const uid = req.params.uid;
        const sid = req.params.sid;
        let stockLiked = false;
        let profile = null;
        if (req.session) {
            profile = req.session['profile'];
        }
        const userId = uid === "me" && profile ?
            profile._id : uid;
        try {
            const userAlreadyLikedStock = await likesDao
                .findUserLikesStock(userId, sid);
            if (userAlreadyLikedStock) {
                await likesDao.userUnlikesStock(userId, sid);
                stockLiked = false
            } else {
                await likesDao.userLikesStock(userId, sid);
                stockLiked = true
            }
            const howManyLikedSong = await likesDao.countHowManyLikes(sid)
            res.status(200).json({count: howManyLikedSong, userLiked: stockLiked});
        } catch (e) {
            console.log(e);
            res.sendStatus(404);
        }
    }

    const findUserLikesStock = (req, res) => {
        const uid = req.params.uid;
        let profile;
        if (req.session) {
            profile = req.session['profile'];
        } else {
            profile = null;
        }
        const userId = uid === "me" && profile ? profile._id : uid;

        likesDao.findUserLikesStock(userId, req.params.sid)
            .then(likes => res.json(likes))
            .catch(error => {
                res.error(error)
                throw error;
            })
    }

    app.post('/users/likes/:sid', userLikesStock)
    app.delete('/users/unlikes/:sid', userUnlikesStock)
    app.get('/likes', findAllLikes)
    app.get('/users/:uid/likes', findStocksLikedByUser)
    app.get('/stocks/:sid/likes', findUsersThatLikeStock)
    app.get('users/:uid/likes/:sid', userTogglesStockLikes)
    app.get('stocks/:sid/likesCount', countHowManyLikes)
    app.get('users/:uid/likes/:sid', findUserLikesStock)
    // app.put(updateLike)
}

export default LikesController;