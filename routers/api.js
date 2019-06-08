const apiRouter = require('express').Router();
const topicsRouter = require('../routers/topicsRouter');
const articleRouter = require('../routers/articleRouter')
const commentRouter = require('../routers/commentRouter');
const usersRouter = require('../routers/usersRouter')
const { handle400s } = require('../errors/index')
const sendApiInfo = require('../controllers/api');




apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/users', usersRouter);
apiRouter.get('/', sendApiInfo)

apiRouter.route('/')
    .all(handle400s);




module.exports = apiRouter;