exports.handle400s = (err, req, res, next) => {
  if (err.code === '23503') res.status(400).send({ msg: 'Bad Request' });
  if (err.code === '42703') res.status(400).send({ msg: 'invalid Sort_By Query' });
  if (err.code === '22P02') res.status(400).send({ msg: 'bad request check input query' });
  if (err.code === '22003') res.status(404).send({ msg: 'article Not Found' });
  else next(err);
};

exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: 'Route Not Found' });
  next(err);
};



exports.handle405 = (req, res) => {

  res.status(405).send({ msg: 'METHOD not allowed' });
  next(err);
};

exports.handle500 = (err, req, res, next) => {

  res.status(500).send({ msg: 'Internal Server Error' });
  next(err);
};