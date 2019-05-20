const topicsRouter = require('express').Router();
const { getTopics, continsertTopic } = require('../controller/topics');
const { handle400s } = require('../errors/index');




topicsRouter.route('/')
    .get(getTopics)
    .post(continsertTopic)
    .all(handle400s);
    

module.exports = topicsRouter;



