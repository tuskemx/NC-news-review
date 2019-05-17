const { fetchArticles, fetchArticleByID, updateArticle, fetchcommentsByID, postCommentModel } = require('../models/articles');

exports.getArticles = (req, res, next) => {
    fetchArticles(req.query)
        .then((articles) => {
            if (articles === undefined) {
                res.status(404).send({ msg: 'Articles Not Found' })
            } else res.status(200).send({
                articles
            })

        })
};

exports.getArticleByID = (req, res, next) =>
    fetchArticleByID(req.params.article_id)
        .then(([article]) => {
            if (article === undefined) {
                res.status(404).send({ msg: 'Article Not Found' });
            } else res.status(200).send({ article });
        })
        .catch(next);

exports.updateArticleCont = (req, res, next) => {
    updateArticle(req.body.inc_votes, req.params.article_id)
        .then(([article]) => {

            return res.status(200).send({ article });
        })
        .catch(console.log);
};




exports.getcommentsByID = (req, res, next) => {

    const id = req.params; //destructure id?
    const sortBy = req.query.sort_by;
    const order = req.query.order;
    console.log(id);
    fetchcommentsByID(id, sortBy, order).then((comments) => {

        res.status(200).send(comments);
    }).catch(next);
};

exports.postComment = (req, res, next) => {
    console.log("HELLLLLLLLLLLLLLLLO")

    const { article_id } = req.params;
    console.log(article_id);
    postCommentModel(req.body, article_id)
        .then((comm) => {
            console.log(comm);
            return res.status(200).send({comm});
        }).catch(console.log);
}





