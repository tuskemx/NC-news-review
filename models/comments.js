const connection = require('../db/connection');

exports.updateComment = (inc_votes, comment_id) => {
  console.log(inc_votes);
  console.log(comment_id);
  return connection('comments')
    .where('comments.comment_id', '3')
    .increment('votes', inc_votes)
    .returning('*');
};

exports.deleteCommentModel = (comment_id) => {
  return connection('comments')
    .where({ comment_id })
    .delete();

};
  //go through and console log each req

