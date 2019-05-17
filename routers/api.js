const apiRouter = require('express').Router();
const topicsRouter = require('../routers/topicsRouter');
const articleRouter = require('../routers/articleRouter')
const commentRouter = require('../routers/commentRouter');
const usersRouter = require('../routers/usersRouter')
const { handle405 } = require('../errors/index')




apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/users', usersRouter);



apiRouter.route('')
  .get((req, res, next) => {
    res.status(200)
  })
  .all(handle405);

module.exports = apiRouter;