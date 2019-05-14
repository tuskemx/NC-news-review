const { fetchArticles } = require('../models/articles');



const getArticles = (req, res, next) => {
    const {
      author, topic, sort_by, order, limit,
    } = req.query;
    return getArticlesModel(author, topic, sort_by, order, limit)
      .then((articles) => {
        if (articles.length > 0) res.status(200).send({ articles });
        else Promise.reject({ status: 404, msg: 'Article Not Found' });
      })
      .catch(next);
  };

  module.export = {
      getArticles
  }