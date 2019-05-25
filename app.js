
const express = require('express');
const app = express();
const apiRouter = require('./routers/api');
const { handle400s } = require('./errors/index');



app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', (req, res, next) => {
    res.status(404).send({ msg: 'Route not found' })
});


app.use(handle400s);

app.use((err, req, res, next) => {
    res.status(500).send({ msg: 'Internal Server Error' });
  });

  
module.exports = app;


//endpoints

// {
//     "GET /api": {
//       "description": "serves up a json representation of all the available endpoints of the api"
//     },
//     "GET /api/topics": {
//       "description": "serves an array of all topics",
//       "queries": [],
//       "exampleResponse": {
//         "topics": [{ "slug": "football", "description": "Footie!" }]
//       }
//     },
//     "GET /api/articles": {
//       "description": "serves an array of all topics",
//       "queries": ["author", "topic", "sort_by", "order"],
//       "exampleResponse": {
//         "articles": [
//           {
//             "title": "Seafood substitutions are increasing",
//             "topic": "cooking",
//             "author": "weegembump",
//             "body": "Text from the article..",
//             "created_at": 1527695953341
//           }
//         ]
//       }
//     }
//   }



