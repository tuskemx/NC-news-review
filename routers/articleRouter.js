const articleRouter = require('express').Router();
const { getArticles, getArticleByID, updateArticleCont, getcommentsByID, postComment } = require('../controller/articles');
const { handle400s } = require('../errors/index');




articleRouter.route('/')
    .get(getArticles)
    .all(handle400s);

articleRouter.route('/:article_id')
    .get(getArticleByID)
    .patch(updateArticleCont)
    .all(handle400s);

articleRouter.route('/:article_id/comments')
    .get(getcommentsByID)
    .post(postComment)
    .all(handle400s);





module.exports = articleRouter;