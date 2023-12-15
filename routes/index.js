const express = require('express');
const app = express();

const notes = require('./notes');
const apiRouter = require('./api');

app.use('/notes', notes);
app.use('/api', apiRouter);

module.exports = app;