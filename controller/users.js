// const {
//     fetchUsers
// } = require('../models/users');

// const getUsers = (req, res, next) => fetchUsers()
//     .then((fetchedUsers) => {
//         if (fetchedUsers) res.status(200).send({ fetchedUsers });
//         else Promise.reject({ status: 404, msg: 'Users Not Found' });
//     })
//     .catch(next);

// module.exports = {
//     getUsers
// }