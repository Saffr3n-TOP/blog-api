const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');

const app = express();

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.DB_URI, { dbName: process.env.DB_NAME })
  .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/posts', postsRouter);

app.use((req, res, next) => {
  const err = createError(404, 'Page Not Found');
  next(err);
});

app.use(
  /**
   * @param {import('http-errors').HttpError} err
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  (err, req, res, next) => {
    const isDevEnv = process.env.NODE_ENV === 'development';

    const status =
      err.status < 500 || isDevEnv
        ? err.status || 500
        : 500;

    const message =
      status < 500 || isDevEnv
        ? err.message || 'Unknown Error'
        : 'Server Error';

    const error = { status, message };
    isDevEnv && (error.stack = err.stack);

    res.status(status).json({ error });
  }
);

const port = +process.env.PORT || 3000;
app.listen(port, () => console.log(`App is available on port ${port}`));
