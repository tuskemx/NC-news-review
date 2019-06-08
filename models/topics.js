const connection = require('../db/connection');

exports.fetchTopics = () => {
    return connection('topics').select('*');
};

exports.postTopicModel = (topicData) => {
    return connection('topics')
        .insert(topicData)
        .returning('*');
};


