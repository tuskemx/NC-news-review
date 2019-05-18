const connection = require('../db/connection');

exports.fetchUsers = () => {
    return connection('users').select('*');
  };
  

exports.fetchUsersModel = (username) => {
    return connection('users').select('*')
    .where( { username })
};

