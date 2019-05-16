const { fetchArticles, fetchArticleByID, updateArticle } = require('../models/articles');

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
            // if (typeof req.body.inc_votes !== 'number' && Object.keys(req.body).length > 0) return Promise.reject({ status: 400, msg: 'Bad request' });
            return res.status(200).send({ article });
        })
        .catch(console.log);
};

// exports.sendHouses = (req, res, next) => {
//     selectHouses()
//       .then((houses) => res.status(200).send({ houses }))
//       .catch(next);
//   };


// const getArticles = (req, res, next) => {
//     const {
//       author, topic, sort_by, order, limit,
//     } = req.query;
//     return getArticlesModel(author, topic, sort_by, order, limit)
//       .then((articles) => {
//         if (articles.length > 0) res.status(200).send({ articles });
//         else Promise.reject({ status: 404, msg: 'Article Not Found' });
//       })
//       .catch(err => {
//           next(err)
// }
//   };





//exports deletearticleid = (req, res, next) => {
    //const { house_id } = req.params;
    //removeHouseById(house-id);
    //.then(reuslt => {
//         //if result ==== 0) return;
//         else readonly.sendStatus(204);
// });s
// .catch(err => {
//     resizeBy.status(400).send({ msg:request})
// })
//     })


