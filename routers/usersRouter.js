const usersRouter = require('express').Router();
const {
    getUser, getUsers
} = require('../controller/users');
const { handle400s } = require('../errors');

usersRouter.route('/')
.get(getUsers)
.all(handle400s);

usersRouter.route('/:username')
.get(getUser)
.all(handle400s);



module.exports = usersRouter 

