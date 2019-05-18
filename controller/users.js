const { fetchUsersModel, fetchUsers } = require('../models/users');

exports.getUsers = (req, res, next) => {
    fetchUsers()
      .then((users) => {
          console.log(users);
          if (!users) return Promise.reject({ status: 404});
          return res.send({users})
      })
      .catch(console.log);
  };



exports.getUser = (req, res, next) => {
    fetchUsersModel(req.params.username)
      .then(([user]) => {
        if (!user) return Promise.reject({ status: 404 });
        return res.send({ user });
      })
      .catch(next);
  };



// exports.getUsers = (req, res, next) => {
//     console.log('hello');
//     console.log(req.query);
//     fetchUsersModel(req.query)
//         .then((user) => {
//             console.log(user);
//             if (!user) {
//                 return Promise.reject(status(404).send({ msg: 'USER NOT FOUND' }))
//             } else res.status(200).send({
//                 articles
//             })
//         })

// };
