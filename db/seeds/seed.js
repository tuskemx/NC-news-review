const { articleData, commentData, topicData, userData } = require('../data/test-data/index');
const { formatDate, formatComments, createRef } = require('../../formattingfunctions');
//utils as well for time etc



exports.seed = function (knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex('topics')
      .insert(topicData)
      .returning('*'))
    .then(() => knex('users')
      .insert(userData)
      .returning('*'))
    .then(() => knex('articles')
      .insert(formatDate(articleData))
      .returning('*'))
    .then((articleRows) => {
      const articleRef = createRef(articleRows, 'title', 'article_id');
      const formattedComments = formatComments(commentData, articleRef);
      const dateComments = formatDate(formattedComments);
      console.log(dateComments);
      const insertedComments = knex('comments')
        .insert(dateComments)
          .returning('*');

      return Promise.all([articleRows, insertedComments]);
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






