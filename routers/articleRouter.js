const articleRouter = require('express').Router();
const { getArticles, getArticleByID, updateArticleCont, getcommentsByID, postComment } = require('../controller/articles');
const { handle405 } = require('../errors/index');




articleRouter.route('/').get(getArticles);

articleRouter.route('/:article_id').get(getArticleByID).patch(updateArticleCont);

articleRouter.route('/:article_id/comments')
    .get(getcommentsByID).patch(postComment)        // comments controller 

// .all handle404





module.exports = articleRouter;