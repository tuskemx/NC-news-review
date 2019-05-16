const connection = require('../db/connection');

exports.fetchTopics = () => {
    return connection('topics').select('*');
};

exports.insertTopic = (topicData) => {
    return connection('topics')
        .insert(topicData)
        .returning('*');
};


