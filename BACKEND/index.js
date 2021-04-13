const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const debug = require('debug')('app');
const { connect } = require('mongoose');

const todoRouter = require('./src/routes/todoRouter');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/todos', todoRouter);

app.listen(port, () => {
  debug(`Server running in ${chalk.yellow(`http://localhost:${port}`)}`);
});
