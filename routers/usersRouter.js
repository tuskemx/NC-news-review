const usersRouter = require('express').Router();
const {
    getUsers
} = require('../controller/users');



usersRouter.route('/:username').get(getUsers)



module.exports = { usersRouter }

