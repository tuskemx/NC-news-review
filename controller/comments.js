const { updateComment, deleteCommentModel } = require('../models/comments');


exports.patchComment = (req, res, next) => {
    if (typeof req.body.inc_votes !== 'number') {
        inc_votes = 0;
    } else {
        inc_votes = req.body.inc_votes
    }
    if (inc_votes === 0) return res.status(404).send({ msg: 'Cannot increment by that value, check your input' });
    console.log(inc_votes);
    updateComment(inc_votes, req.params.comment_id)
        .then(([comment]) => {
            console.log(comment);
            console.log(comment);
            console.log(comment);
            if (!comment) return res.status(404).send({ msg: 'comment not found' });
            return res.status(200).send({ comment: comment });
        })
        .catch(next);
};


exports.deleteComment = (req, res, next) => {
    deleteCommentModel(req.params.comment_id)
        .then((deleteRow) => {
            if (deleteRow === 0 || typeof deleteRow !== 'number') return res.status(404).send({ status: 404, msg: `${req.params.comment_id}` + 'does not exist' });
            else return res.status(204).send({ msg: `${req.params.comment_id}` + 'deleted' });
        })
        .catch(next);
}






