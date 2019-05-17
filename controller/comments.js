const updateComment = require('../models/comments');


exports.patchComment = (req, res, next) => {
    console.log(req.body);
    console.log(req.params.comment_id)
    updateComment(req.body, req.params.comment_id)
        .then(([comment]) => {
            if (!comment) return Promise.reject({ status: 404 });
            return res.status(200).send({ comment });
        })
        .catch(console.log);
};

