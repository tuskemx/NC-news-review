
const express = require('express');
const app = express();
const apiRouter = require('./routers/api');
const { handle400s, handle405, routeNotFound, handle500 } = require('./errors/index');
// const cors = require('cors')
// app.use(cors())


app.use(express.json());

app.use('/api', apiRouter);
app.use(handle400s);
app.use(handle405);
app.use(routeNotFound);
app.use(handle500);






module.exports = app;



