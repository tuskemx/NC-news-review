exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: 'Route Not Found' });
};

exports.methodNotAllowed = (req, res) => {
  //const errorCodes = {
  //'23502': 'Method not allowed,
  // '23p02: 'ise
  //}
  //if (err.code === '23502') {etc}
  // //{ msg: errorCodes[err.coode] }
  // if (errorCodes[err.codes]) {
  res.status(405).send({ msg: 'Method Not Allowed' });
  //next(err); to pass err to handle 500 below or whatever
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
};
