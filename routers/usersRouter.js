const usersRouter = require('express').Router();
const {
    getUser, getUsers, postUser
} = require('../controller/users');
const { handle405 } = require('../errors');

usersRouter.route('/')
.get(getUsers)
.post(postUser)
.all(handle405);

usersRouter.route('/:username')
.get(getUser)
.all(handle405);



module.exports = usersRouter 

