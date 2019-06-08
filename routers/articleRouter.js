const articleRouter = require('express').Router();
const { getArticles, getArticleByID, updateArticleCont, getcommentsByID, postComment, postArticleController } = require('../controller/articles');
const { handle405 } = require('../errors/index');




articleRouter.route('/')
    .get(getArticles)
    .post(postArticleController)
    .all(handle405);

articleRouter.route('/:article_id')
    .get(getArticleByID)
    .patch(updateArticleCont)
    .all(handle405);

articleRouter.route('/:article_id/comments')
    .get(getcommentsByID)
    .post(postComment)
    .all(handle405);





module.exports = articleRouter;