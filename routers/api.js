const apiRouter = require('express').Router();
const articlesRouter = require('../routers/articlesRouter');



apiRouter.use('/articles', articlesRouter);


apiRouter
  .route('/')
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

module.exports = apiRouter;