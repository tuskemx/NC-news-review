const usersRouter = require('express').Router();
const {
    getUser, getUsers, postUser
} = require('../controller/users');
const { handle400s } = require('../errors');

usersRouter.route('/')
.get(getUsers)
.post(postUser)
.all(handle400s);

usersRouter.route('/:username')
.get(getUser)
.all(handle400s);



module.exports = usersRouter 

