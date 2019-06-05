const { fetchArticles, fetchArticleByID, updateArticle, fetchcommentsByID, postCommentModel, fetchArticleCount } = require('../models/articles');






exports.getArticles = (req, res, next) => {
    Promise.all([fetchArticleCount(req.query), fetchArticles(req.query)]) //why can the query be split in the model here?
        .then(([totalcount, articles]) => {
            console.log(totalcount, '***');
            //promise all count and then all articles
            if (articles.length > 0) res.status(200).send({ totalcount, articles: articles })
            else res.status(404).send({ msg: 'Articles Not Found' }) //said in notes to make own model for checking author?
        }).catch(next);
};


exports.getArticleByID = (req, res, next) => {

    fetchArticleByID(req.params.article_id)
        .then(([article]) => {
            if (article === undefined) res.status(404).send({ msg: 'article not found ' })
            let idtoNum = Number(req.params.article_id); // makes sure its string of number
            if (req.params.article_id < 0 || typeof idtoNum !== 'number') {
                res.status(400).send({ msg: 'Article not found check your input' });
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
    inc_votes = req.body.inc_votes;
    if (inc_votes === undefined || typeof inc_votes !== 'number') {
        inc_votes = 0;
    }
    updateArticle(inc_votes, req.params.article_id)
        .then(([article]) => {
            if (article === undefined) {
                res.status(400).send({ msg: 'Article Not Found' });
            } else
                res.status(200).send({ article });
        })
        .catch(next);
};


exports.getcommentsByID = (req, res, next) => {
    const id = req.params; //destructure id?
    const sortBy = req.query.sort_by;
    const order = req.query.order;
    fetchArticleByID(req.params.article_id).then((article) => {
        if (article.length === 0) {
            res.status(404).send({ msg: 'Article Not Found' });
        }
        fetchcommentsByID(id, sortBy, order).then((comments) => {
            res.status(200).send({ comments: comments });
        }).catch(next);
    })
}



exports.postComment = (req, res, next) => {

    const { article_id } = req.params;
    let idnum = Number(article_id)
    if (idnum > 30 || typeof idnum !== 'number') res.status(422).send({ msg: 'unprocessable entity 422' });
    postCommentModel(req.body, article_id)
        .then(([comm]) => {
            if (!comm || comm === undefined) {
                res.status(400).send({ msg: 'Article Not Found' });
            } else
                res.status(201).send({ comment: comm });
        }).catch(next);
}





