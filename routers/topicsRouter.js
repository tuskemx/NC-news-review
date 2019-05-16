const topicsRouter = require('express').Router();
const { getTopics, continsertTopic } = require('../controller/topics');
const { handle405 } = require('../errors/index');




topicsRouter.route('/')
    .get(getTopics)
    .post(continsertTopic)
    

module.exports = topicsRouter;



