const { fetchArticles, fetchArticleByID, updateArticle, fetchcommentsByID, postCommentModel } = require('../models/articles');

exports.getArticles = (req, res, next) => {
    // const author = req.query.author;
    // const sort_by = req.query.sort_by;
    // const order = req.query.order;
    // const { limit, sort_by, p, order, author, topic } = req.query;
    //dont have to pass sep values because of query in model?

    // const topic = req.query.topic;
    fetchArticles(req.query)
        .then((articles) => {

            if (articles.length > 0) return res.status(200).send({ articles: articles })
            else return res.status(404).send({ msg: 'Articles Not Found' }) //said in notes to make own model for checking author?
        }).catch(next);
};

exports.getArticleByID = (req, res, next) => {

    fetchArticleByID(req.params.article_id)
        .then(([article]) => {
            let idtoNum = Number(req.params.article_id); // makes sure its string of number
            if (req.params.article_id < 0 || typeof idtoNum !== 'number' || article === undefined || !article) {
                return res.status(400).send({ msg: 'Article not found check your input' });
                //add 404 
            } else res.status(200).send({ article: article });
        }).catch(next);
};

// if (req.body.inc_votes === undefined) {
//     res.status(400).send({ msg: 'Vote Not Found' });
//   } else if (typeof req.body.inc_votes !== 'number') {
//     res.status(400).send({ msg: 'Vote Not Valid Number' });
//   } else {
exports.updateArticleCont = (req, res, next) => {
    if (typeof req.body.inc_votes !== 'number') {
        inc_votes = 0;
    } else {
        inc_votes = req.body.inc_votes
    }
    updateArticle(req.body.inc_votes, req.params.article_id)
        .then(([article]) => {
            if (!article || article === undefined) {
                return res.status(400).send({ msg: 'Article Not Found' });
            } else
                return res.status(200).send({ article });
        })
        .catch(next);
};

exports.getcommentsByID = (req, res, next) => {
    const id = req.params; //destructure id?
    const sortBy = req.query.sort_by;
    const order = req.query.order;
    fetchcommentsByID(id, sortBy, order).then((comments) => {

        if (comments.length <= 0) return res.status(404).send({ msg: 'No comments found for that article' })
        if (comments === undefined || typeof comments === 'number') {
            return res.status(404).send({ msg: 'Article Not Found' });
        } else res.status(200).send({ comments: comments }); // change comments to array?
        // if comments.body.length < 1 res status 200 return empty array?
    }).catch(next);
};

exports.postComment = (req, res, next) => {
    const { article_id } = req.params;
    let idnum = Number(article_id)
    if (idnum > 30 || typeof idnum !== 'number') return res.status(422).send({ msg: 'unprocessable entity 422' });
    postCommentModel(req.body, article_id)
        .then(([comm]) => {
            if (!comm || comm === undefined) {
                return res.status(400).send({ msg: 'Article Not Found' });
            } else
                return res.status(201).send({ comment: comm });
        }).catch(next);
}





