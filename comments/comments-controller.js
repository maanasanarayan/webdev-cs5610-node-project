import * as commentDao from "./comments-dao";
const CommentsController = (app) => {

    const getComments = async (req, res) => {
        try {
            const comments = await commentDao.getComments(req.params.sid);
            res.status(200).json(comments);
        } catch (err) {
            res.status(404)
                .json({
                    error: err
                })
        }

    }

    const addComments = async (req, res) => {
        const uid = req.params.uid;
        const sid = req.params.sid;
        let profile = null;
        if(req.session) {
            profile = req.session["profile"];
        }
        const userId = uid === "me" && profile ? profile._id : uid;
        try {
            const comment = await commentDao.addComment(userId, sid, req.body.comment)
            res.status(200).json(comment)
        } catch (err) {
            res.status(403).json({error: err});
        }
    }

    const updateComment = async (req, res) => {
        const uid = req.params.uid;
        const cid = req.params.cid;
        let profile = null;
        if (req.session) {
            profile = req.session["profile"];
        }
        const userId = uid === "me" && profile ? profile._id : uid;

        try {
            const comment = await commentDao.updateComment(userId, cid, req.body.comment)
            res.status(200).json(comment)
        } catch (err) {
            res.status(403).json({
                error : err
            })
        }
    }

    const deleteComment = async (req, res) => {
        const uid = req.params.uid;
        const cid = req.params.cid;
        let profile = null;
        if (req.session) {
            profile = req.session["profile"];
        }
        const userId = uid === "me" && profile ? profile._id : uid;
        try {
            const comment = await commentDao.deleteComment(userId,cid);
            res.status(200).json(comment)
        } catch (err) {
            res.status(403).json({
                error: err
            })
        }
    }

    app.get("comments/:sid", getComments)
    app.post("comments/:uid/stocks/:sid", addComments)
    app.put("comments/:uid/comment/:cid", updateComment)
    app.delete("comments/:uid/comment/:cid", deleteComment)
}

export default CommentsController;