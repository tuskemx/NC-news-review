const topicsRouter = require('express').Router();
const { getTopics, postTopicController } = require('../controller/topics');
const { handle405 } = require('../errors/index');




topicsRouter.route('/')
    .get(getTopics)
    .post(postTopicController)
    .all(handle405);
    

module.exports = topicsRouter;



