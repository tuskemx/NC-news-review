const formatDate = (input) => {
    const timeMap = input.map((obj) => {
        const newDate = new Date(obj.created_at);
        const newObj = { ...obj, created_at: newDate.toISOString() };
        return newObj;
    })
    return timeMap;
}


//reduce article to title:id
function createRef(arr, key, value) {
    const refObj = {};
    arr.forEach((item) => {
      refObj[item[key]] = item[value];
    });
    return refObj;
  }

  function formatComments(commentsArr, articleRef) {
    const newArr = [];
    commentsArr.forEach(((comment) => {
      newArr.push({
        author: comment.created_by,
        article_id: articleRef[comment.belongs_to],
        votes: comment.votes,
        created_at: comment.created_at,
        body: comment.body,
      });
    }));
    return newArr;
  }
//object keys
//ref object
//format comment obj


module.exports = {
    formatDate,
    createRef,
    formatComments
}