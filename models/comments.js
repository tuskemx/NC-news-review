const connection = require('../db/connection');

exports.updateComment = (inc_votes, comment_id) => {
  
  // if (inc_votes !== typeof 'number') inc_votes = 0; 
  return connection('comments')
    .where('comments.comment_id', comment_id)
    .increment('votes', inc_votes)
    .returning('*');
};

exports.deleteCommentModel = (comment_id) => {
  return connection('comments')
    .where({ comment_id })
    .delete();

};
  //go through and console log each req

