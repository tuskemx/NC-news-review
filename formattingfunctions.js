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

  function formatComments(commArray, articleRef) {
    const newArr = [];
    commArray.forEach(((comm) => {
      newArr.push({
        author: comm.created_by,
        article_id: articleRef[comm.belongs_to],
        votes: comm.votes,
        created_at: comm.created_at,
        body: comm.body,
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