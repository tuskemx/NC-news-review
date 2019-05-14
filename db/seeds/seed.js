const { articleData, commentData, topicData, userData } = require('../data/test-data/index');
const { formatDate } = require('../../formattingfunctions');
//utils as well for time etc



exports.seed = function (knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const topicInsertions = knex('topics')
        .insert(topicData)
        .returning('*');
      const userInsertions = knex('users')
        .insert(userData)
        .returning('*');
      const articleInsertions = knex('articles')
        .insert(formatDate(articleData))
        .returning('*');
      const commentInsertions = knex('comments')
        .insert(formatDate(commentData))
        .returning('*');
      return Promise.all([topicInsertions, userInsertions, articleInsertions, commentInsertions])
    })
};

// .then((articleRows) => {
//   const articleRef = createRef(articleRows, 'title', 'article_id');
//   const formattedArticle = formatComments(commentData, articleRef);
//   return knex('comments')
//     .insert(formattedArticle)
//     .returning('*')
// });
// };


//create createRef lookup obj
//create formatComments obj



