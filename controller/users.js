const { fetchUserModel, fetchUsers, postUser } = require('../models/users');

exports.getUsers = (req, res, next) => {
  fetchUsers()
    .then((users) => {
      if (!users) return Promise.reject({ status: 404 });
      return res.send({ users })
    })
    .catch(next);
};



exports.getUser = (req, res, next) => {
  fetchUserModel(req.params.username)
    .then(([user]) => {
      if (!user || user === undefined) return res.status(404).send({ message: 'User ID not found' });
      return res.send({ user });
    })
    .catch(next);
};

exports.postUser = (req, res, next) => { //added recently extra
  const { username, avatar_url, name } = req.body;
  console.log(req.body);
  if (typeof username !== 'string') {
    res.status(400).send({ message: 'Invalid Username' });
  } else if (typeof name !== 'string') {
    res.status(400).send({ message: 'Invalid Name' });
  } else {
    return postUser(username, avatar_url, name)
      .then(([postedUser]) => {
        res.status(201).send({ postedUser });
      })
      .catch(next);
  }
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
