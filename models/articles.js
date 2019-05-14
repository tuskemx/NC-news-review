const connection = require('../db/connection');

const getArticlesModel = (
  author,
  topic,
  sort_by = 'articles.created_at',
  order = 'desc',
  limit = 10,
) => connection
  .select(
    'articles.author',
    'articles.title',
    'articles.article_id',
    'articles.topic',
    'articles.created_at',
    'articles.votes',
  )
  .from('articles')
  .modify((query) => {
    if (author) query.where('articles.author', author);
  })


  module.export = {
      getArticlesModel
  }