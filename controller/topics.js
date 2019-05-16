const { fetchTopics, modelinsertTopic } = require('../models/topics')

const getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      return res.status(200).send({
        topics
      })
    }).catch(next);
};


const continsertTopic = (req, res, next) => modelinsertTopic(req, res)
  .then(([postedTopic]) => {
    res.status(201).send({ postedTopic });
  })

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