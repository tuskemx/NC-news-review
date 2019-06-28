const { fetchArticles, fetchArticleByID, updateArticle, fetchcommentsByID, postCommentModel, fetchArticleCount, postArticleModel, deleteArticleModel } = require('../models/articles');






exports.getArticles = (req, res, next) => {
    Promise.all([fetchArticleCount(req.query), fetchArticles(req.query)]) //why can the query be split in the model here?
        .then(([totalcount, articles]) => {
            //promise all count and then all articles
            if (articles.length > 0) res.status(200).send({ totalcount, articles: articles })
            else res.status(200).send({ totalcount, articles: [] }) //said in notes to make own model for checking author?
        }).catch(next);
};


exports.getArticleByID = (req, res, next) => {

    fetchArticleByID(req.params.article_id)
        .then(([article]) => {
            if (article === undefined) res.status(404).send({ message: 'article not found', status: 404 })
            let idtoNum = Number(req.params.article_id); // makes sure its string of number
            if (req.params.article_id < 0 || typeof idtoNum !== 'number') {
                res.status(400).send({ message: 'Article not found check your input', status: 400 });
                //add 404 
            } else res.status(200).send({ article: article });
        }).catch(next);
};


exports.updateArticleCont = (req, res, next) => {
    inc_votes = req.body.inc_votes;
    if (inc_votes === undefined || typeof inc_votes !== 'number') {
        inc_votes = 0;
    }
    updateArticle(inc_votes, req.params.article_id)
        .then(([article]) => {
            if (article === undefined) {
                res.status(400).send({ message: 'Article Not Found', status: 400 });
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
            res.status(404).send({ message: 'Article Not Found', status: 404 });
        }
        fetchcommentsByID(id, sortBy, order).then((comments) => {
            res.status(200).send({ comments: comments });
        }).catch(next);
    })
}



exports.postComment = (req, res, next) => {

    const { article_id } = req.params;
    let idnum = Number(article_id)
    if (idnum > 30 || typeof idnum !== 'number') res.status(422).send({ message: 'unprocessable entity 422', status: 422 });
    postCommentModel(req.body, article_id)
        .then(([comm]) => {
            if (!comm || comm === undefined) {
                res.status(400).send({ message: 'Article Not Found', status: 400 });
            } else
                res.status(201).send({ comment: comm });
        }).catch(next);
}

exports.postArticleController = (req, res, next) => {
    const {
        title, body, topic, author,
    } = req.body;
    return postArticleModel(title, body, topic, author)
        .then(([article]) => {
            res.status(201).send({ article });
        })
        .catch(next);
};



exports.deleteArticle = (req, res, next) => {
    return deleteArticleModel(req.params.article_id)
        .then((deleted) => {
            if (deleted === 1) {
                res.status(204).send({ message: 'article posted', status: 204 })
            } else res.status(400).send({ message: 'not deleted', status: 400 })
        }).catch(next)
}





//   exports.deleteComment = (req, res, next) => {
//     deleteCommentModel(req.params.comment_id)
//         .then((deleteRow) => {
//             if (deleteRow === 0 || typeof deleteRow !== 'number') {
//                 return res.status(404).send({ status: 404, message: `${req.params.comment_id}` + 'does not exist' });
//             }
//             else return res.status(204).send({ message: `${req.params.comment_id}` + 'deleted' });
//         })
//         .catch(next);
// }