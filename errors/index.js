exports.handle400s = (err, req, res, next) => {
  if (err.code === '23503') res.status(400).send({ msg: 'Bad Request' });
  if (err.code === '22P02') res.status(400).send({ msg: 'Invalid Article ID' });
  if (err.code === '22003') res.status(404).send({ msg: 'Article Not Found' });
  if (err.code === '23505') res.status(422).send({ msg: 'Topic Already Exists' });
  if (err.code === '23502') res.status(422).send({ msg: 'Topic Description Required' });
  if (err.code === '42703') res.status(400).send({ msg: 'Invalid Sort_By Query' });
  else next(err);
};

exports.routeNotFound = (req, res) => {
  if (err.code === 404) {
    res.status(404).send({ msg: 'Route Not Found' });
  } else {
    next(err);
  };
}

exports.handle405 = (err, req, res, next) => {
  if (err.code === 405) {
    res.status(405).send({ message: err.message });
  } else {
    next(err);
  };
};

exports.handle422 = (err, req, res, next) => {
  if (err.code === 422) {
    res.status(422).send({ message: err.message });
  } else {
    next(err);
  };
};

exports.handle500 = (err, req, res, next) => {
  console.log(err.message);
  res.status(500).send({ message: err.message });
};