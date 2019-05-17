const connection = require('../db/connection');

exports.fetchUsersModel = (query) => {
    console.log(query);
        return connection
            .select('users.username', 'users.avatar_url', 'users.name')
            .from('users')
            .where('users.name', query)
            .returning('*')
    };

    // exports.up = function (knex, Promise) {
    //     return knex.schema.createTable('users', (usersTable) => {
    //       usersTable.string('username').unique().primary();
    //       usersTable.string('avatar_url');
    //       usersTable.string('name');
    //     });
    //   };
      
    //   exports.down = function (knex, Promise) {
    //     return knex.schema.dropTable('users');
    //   };
    

//username
//avatar url
//name {username: mitch, avatar_url: wwwww..w.w.ww, name: ??}
