const { fetchTopics, postTopicModel } = require('../models/topics')

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      if (!topics) return res.status(404).send({ msg: 'Topics Not Found' });
      return res.status(200).send({
        topics
      })
    }).catch(next);
};


exports.postTopicController = (req, res, next) => postTopicModel(req, res)
  .then(([postedTopic]) => {
    if (!postedTopic) return res.status(400).send({ msg: 'Unable to insert topic' });
    return res.status(201).send({
      postedTopic
    });
  }).catch(next);


