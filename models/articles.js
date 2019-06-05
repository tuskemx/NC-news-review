const connection = require('../db/connection');




exports.fetchArticleCount = ({ topic, author }) => {
    return connection
        .from('articles')
        .count({ totalcount: 'articles.article_id' })
        .modify((query) => {
            if (topic) query.where('articles.topic', topic);
            if (author) query.where('articles.author', author);
        })
        .then(([totalcount]) => {
            return +totalcount.totalcount
        })

}

exports.fetchArticles = ({
    limit = 10,
    p = 1,
    sort_by = 'articles.created_at',
    order = 'desc',
    author,
    topic
}) => {
    return connection
        .select('articles.article_id', 'articles.author', 'articles.created_at', 'articles.title', 'articles.topic', 'articles.votes', 'articles.body')
        .from('articles')
        .leftJoin('comments', 'comments.article_id', 'articles.article_id')
        .count({ comment_count: 'comments.comment_id' })
        .groupBy('articles.article_id')
        .limit(limit)
        .modify((query) => {
            if (author) query.where('articles.author', author);
            if (sort_by) query.orderBy(sort_by, order);
            if (topic) query.where('articles.topic', topic);
            if (limit) query.limit(limit);
            if (p) query.offset((p - 1) * limit)

        });
    //regex it to a number

};

exports.fetchArticleByID = (id) => {
    return connection
        ('articles')
        .select('articles.*')
        .leftJoin('comments', 'comments.article_id', 'articles.article_id')
        .where({ 'articles.article_id': id })
        .groupBy('articles.article_id')
        .count({ comment_count: 'comments.comment_id' });
};

exports.updateArticle = (inc_votes, article_id) => {
    return connection('articles')
        .where({ article_id })
        .increment('votes', inc_votes)
        .returning('*');
};



exports.fetchcommentsByID = (
    id,
    sort_by = 'created_at',
    order = 'desc') => {
    return connection
        .select('comments.comment_id', 'comments.votes', 'comments.created_at', 'comments.author', 'comments.body', 'comments.article_id')
        .from('comments')
        .where('comments.article_id', id.article_id)
        .modify((query) => {
            query.orderBy('comments.' + `${sort_by}`, order || 'asc');
        });
};

exports.postCommentModel = (req, article_id) => {
    const newReq = { author: req.author, body: req.body, article_id: article_id }
    return connection('comments')
        .insert(newReq)
        .returning('*');
};
















