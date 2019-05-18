const commentRouter = require('express').Router();
const { patchComment, deleteComment } = require('../controller/comments');
const { handle405 } = require('../errors');

commentRouter.route('/:comment_id')
    .patch(patchComment).delete(deleteComment).all(handle405);


module.exports = commentRouter;