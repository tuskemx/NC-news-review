const apiInfo = require('../endpointsData.json');

const sendApiInfo = (req, res, next) => {

    return res.status(200).send(apiInfo);

}


module.exports = sendApiInfo;