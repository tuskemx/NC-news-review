const connection = require('../db/connection');


// const getArticlesModel = () => {
// console.log('change');
// };

exports.fetchArticles = ({
    sort_by = 'articles.created_at',
    order = 'desc',
    author,
    topic
}) => {
    return connection
        .select('articles.article_id', 'articles.author', 'articles.created_at', 'articles.title', 'articles.topic', 'articles.votes')
        .from('articles')
        .leftJoin('comments', 'comments.article_id', 'articles.article_id')
        .groupBy('articles.article_id', 'comments.comment_id')
        .count({ comment_count: 'comments.comment_id' })
        .modify((query) => {
            if (author) query.where('articles.author', author);
            if (sort_by) query.orderBy(sort_by, order);
            if (topic) query.where('articles.topic', topic);
        });
    //regex it to a number

};

exports.fetchArticleByID = (params) => connection
    .select('articles.article_id', 'articles.author', 'articles.created_at', 'articles.title', 'articles.topic', 'articles.votes')
    .from('articles')
    .leftJoin('comments', 'comments.article_id', 'articles.article_id')
    .groupBy('articles.article_id', 'comments.comment_id')
    .where('articles.article_id', params)
    .count({ comment_count: 'comments.comment_id' });

exports.updateArticle = (inc_votes, article_id) => {
    return connection('articles')
        .where({ article_id })
        .increment('votes', inc_votes)
        .returning('*');
};

// .leftJoin('comments', 'comments.article_id', 'articles.article_id')
// .where({ 'articles.article_id' : params })
// .groupBy('article.article_id')
// .count({ 'coment_count': 'comments.comment_id});

// exports.fetchArticleByID = ({ article_id }) => {
//     return knex('articles')
//       .select('articles.*')
//       .leftJoin('comments', 'comments.article_id', 'articles.article_id')
//       .where({ 'articles.article_id': article_id })
//       .groupBy('articles.article_id')
//       .count({





//