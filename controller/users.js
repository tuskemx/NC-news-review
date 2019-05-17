const { fetchUsersModel } = require('../models/users');




exports.getUsers = (req, res, next) => {
    console.log('hello');
    fetchUsersModel(req.query)
        .then((user) => {
            console.log(user);
            if (!user) {
                res.status(404).send({ msg: 'USER NOT FOUND' })
            } else res.status(200).send({
                articles
            })
        })

};
