const { articleData, commentData, topicData, userData } = require('../data/test-data/index');
const { formatDate, formatComments, createRef } = require('../../formattingfunctions');
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
      return Promise.all([topicInsertions, userInsertions]);
    })
    .then(([topicInsertions, userInsertions]) => {
      const articleInsertions = knex('articles')
        .insert(formatDate(articleData))
        .returning('*');
      return Promise.all([topicInsertions, userInsertions, articleInsertions]);
    })
    .then(([topicInsertions, userInsertions, articleInsertions]) => {
      const commentInsertions = knex('comments')
        .insert(formatComments(formatDate(commentData), createRef(articleInsertions, 'title', 'article_id')))
        .returning('*');
      return Promise.all([topicInsertions, userInsertions, articleInsertions, commentInsertions]);
    });
};


// const commentInsert = knex('comments')
//   .insert(formatDate(commentData))
//   .returning('*');
// return Promise.all([topicInsert, userInsert, articleInsert, commentInsertions])
//     })
// };
// //article_id doesnt exist
// //comment id doesnt exist
// //only linked by author
// //name id pair obj --> format --> insert



// .then((articleRows) => {
//   const articleRef = createRef(articleRows, 'title', 'article_id');
//   const formattedArticle = formatComments(commentData, articleRef);
//   return knex('comments')
//     .insert(formattedArticle)
//     .returning('*')
// });
// };






