const { fetchTopics, modelinsertTopic } = require('../models/topics')

const getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      if (!topics) return res.status(404).send({ msg: 'Topics Not Found' });
      return res.status(200).send({
        topics
      })
    }).catch(next);
};


const continsertTopic = (req, res, next) => modelinsertTopic(req, res)
  .then(([postedTopic]) => {
    if (!postedTopic) return res.status(400).send({ msg: 'Unable to insert topic' });
    return res.status(201).send({
      postedTopic
    });
  }).catch(next);

// exports.sendTopics = (req, res, next) => {
//   fetchTopics()
//     .then((topics) => {
//       res.send({ topics });
//     })
//     .catch(next);
// };

// exports.addTopic = (req, res, next) => {
//   insertTopic(req.body)
//     .then(([topic]) => {
//       res.status(201).send({ topic });
//     })
//     .catch(next);
// };


module.exports = {
  getTopics,
  continsertTopic
}