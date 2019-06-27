const { updateComment, deleteCommentModel } = require('../models/comments');


exports.patchComment = (req, res, next) => {
    inc_votes = req.body.inc_votes
    if (req.body.inc_votes === undefined) {
        inc_votes = 0
    };
    if (typeof req.body.inc_votes !== 'number') {
        res.status(400).send({ message: 'wrong input value', status: 400 })
    };

    updateComment(inc_votes, req.params.comment_id)
        .then(([comment]) => {
            if (!comment) res.status(404).send({ message: 'comment not found', status: 404 });
            return res.status(200).send({ comment: comment });
        })
        .catch(next);
};


exports.deleteComment = (req, res, next) => {
    deleteCommentModel(req.params.comment_id)
        .then((deleteRow) => {
            if (deleteRow === 0 || typeof deleteRow !== 'number') {
                return res.status(404).send({ status: 404, message: `${req.params.comment_id}` + 'does not exist' });
            }
            else return res.status(204).send({ message: `${req.params.comment_id}` + 'deleted' });
        })
        .catch(next);
}






