const { updateComment, deleteCommentModel } = require('../models/comments');


exports.patchComment = (req, res, next) => {


    updateComment(req.body.inc_votes, req.params.comment_id)
        .then(([comment]) => {
            console.log(comment);
            if (!comment) return Promise.reject({ status: 404 });
            return res.status(200).send({ comment });
        })
        .catch(next);
};

exports.deleteComment = (req, res, next) => {

    deleteCommentModel(req.params.comment_id)
        .then((deleteRow) => {
            if (!deleteRow) return Promise.reject({ status: 404 });
            return res.status(204).send();
        })
        .catch(console.log);
}






