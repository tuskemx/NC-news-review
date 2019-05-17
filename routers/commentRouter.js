const commentRouter = require('express').Router();
const { patchComment } = require('../controller/comments');
const { handle405 } = require('../errors');

commentRouter.route('/:comment_id')
    .patch(patchComment)


module.exports = commentRouter;