const commentRouter = require('express').Router();
const { patchComment, deleteComment } = require('../controller/comments');
const { handle400s } = require('../errors');

commentRouter.route('/:comment_id')
    .patch(patchComment).delete(deleteComment).all(handle400s);

/// handle500s to solve issues


module.exports = commentRouter;