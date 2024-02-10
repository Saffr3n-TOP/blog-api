const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');

const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const User = require('./models/user');

const app = express();

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.DB_URI, { dbName: process.env.DB_NAME })
  .catch((err) => console.error(err));

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username })
      .exec()
      .catch((err) => createError(500, err));

    if (user instanceof Error) {
      return done(user);
    }

    if (!user) {
      return done(null, false, { message: 'Incorrect username or password' });
    }

    const isCorrectPassword = await bcrypt
      .compare(password, user.hash)
      .catch((err) => createError(500, err));

    if (isCorrectPassword instanceof Error) {
      return done(isCorrectPassword);
    }

    if (!isCorrectPassword) {
      return done(null, false, { message: 'Incorrect username or password' });
    }

    done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
    .exec()
    .catch((err) => createError(500, err));

  if (user instanceof Error) {
    return done(user);
  }

  done(null, user);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      dbName: process.env.DB_NAME
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/posts', postsRouter);

app.use((req, res, next) => next(createError(404, 'Page Not Found')));

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
