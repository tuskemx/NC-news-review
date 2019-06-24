// require in and export out all test data
const userData = require('./users');
const articleData = require('./articles');
const commentData = require('./comments');
const topicData = require('./topics');

//data got deleted when stashed gr9

module.exports = {
    userData,
    articleData,
    commentData,
    topicData
}