const articleRouter = require('express').Router();
const { getArticles, getArticleByID, updateArticleCont } = require('../controller/articles');
const { handle405 } = require('../errors/index');




articleRouter.route('/').get(getArticles);

articleRouter.route('/:article_id').get(getArticleByID).patch(updateArticleCont);

// .all handle404



module.exports = articleRouter;