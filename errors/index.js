exports.handle400s = (err, req, res, next) => {
  if (err.code === '23503') res.status(400).send({ msg: 'Bad Request' });
  if (err.code === '42703') res.status(404).send({ msg: 'not a valid sort_by query' });
  if (err.code === '22P02') res.status(400).send({ msg: 'bad request check input query' });
  if (err.code === '23503') res.status(400).send({ msg: 'Bad Request' });
  if (err.code === '23503') res.status(400).send({ msg: 'Bad Request' });
  if (err.code === '23503') res.status(400).send({ msg: 'Bad Request' });
  if (err.code === '23503') res.status(400).send({ msg: 'Bad Request' });
  
  //dry and change to specificity

  else next(err);
};

exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: 'Route Not Found' });
  next(err);
};



exports.handle405 = (req, res) => {
  //const errorCodes = {
  //'23502': 'Method not allowed,
  // '23p02: 'ise
  //}
  //if (err.code === '23502') {etc}
  // //{ msg: errorCodes[err.coode] }
  // if (errorCodes[err.codes]) {
  //next(err); to pass err to handle 500 below or whatever
  res.status(405).send({ msg: 'METHOD not allowed' });
  next(err);
};

exports.handle500 = (err, req, res, next) => {
 
  res.status(500).send({ msg: 'Internal Server Error' });
  next(err);
};