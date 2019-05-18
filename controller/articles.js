const { fetchArticles, fetchArticleByID, updateArticle, fetchcommentsByID, postCommentModel } = require('../models/articles');

exports.getArticles = (req, res, next) => {

    fetchArticles(req.query)
        .then((articles) => {
            if (articles.length > 0) res.status(200).send({ articles })
            else res.status(404).send({ msg: 'Articles Not Found' }) //said in notes to make own model for checking author?
        }).catch(next);
};

exports.getArticleByID = (req, res, next) => {
    if (req.params.article_id === typeof 'string') {
        res.status(400).send({ msg: 'Vote not Found' })
    }
    fetchArticleByID(req.params.article_id)
        .then(([article]) => {
            if (!article || article === undefined) {
                res.status(404).send({ msg: 'Article Not Found' });
            } else res.status(200).send({ article });
        })
        .catch(next);
};

// if (req.body.inc_votes === undefined) {
//     res.status(400).send({ msg: 'Vote Not Found' });
//   } else if (typeof req.body.inc_votes !== 'number') {
//     res.status(400).send({ msg: 'Vote Not Valid Number' });
//   } else {
exports.updateArticleCont = (req, res, next) => {
    console.log(req.body.inc_votes);
    if (req.body.inc_votes === undefined || typeof req.body.inc_votes !== 'number') {
        res.status(400).send({ msg: 'Vote not Found' })
    }
    updateArticle(req.body.inc_votes, req.params.article_id)
        .then(([article]) => {
            if (!article || article === undefined) {
                res.status(400).send({ msg: 'Article Not Found' });
            } else
                return res.status(200).send({ article });
        })
        .catch(next);
};

exports.getcommentsByID = (req, res, next) => {

    const id = req.params; //destructure id?
    const sortBy = req.query.sort_by;
    const order = req.query.order;
    console.log(id);
    fetchcommentsByID(id, sortBy, order).then((comments) => {
        if (!comments || comments === undefined) {
            res.status(404).send({ msg: 'Article Not Found' });
        } else
            res.status(200).send(comments);
    }).catch(next);
};

exports.postComment = (req, res, next) => {
    const { article_id } = req.params;
    postCommentModel(req.body, article_id)
        .then((comm) => {
            if (!comm || comm === undefined) {
                res.status(400).send({ msg: 'Article Not Found' });
            } else
                return res.status(201).send({ comment: comm });
        }).catch(next);
}





