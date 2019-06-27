const { fetchTopics, postTopicModel } = require('../models/topics')

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      if (!topics) return res.status(404).send({ message: 'Topics Not Found', status: 404 });
      return res.status(200).send({
        topics
      })
    }).catch(next);
};


exports.postTopicController = (req, res, next) =>

  postTopicModel(req.body)
    .then(([postedTopic]) => {
      console.log([postedTopic]);
      if (!postedTopic) return res.status(400).send({ message: 'Unable to insert topic', status: 400 });
      return res.status(201).send({
        postedTopic
      });
    }).catch(next);


