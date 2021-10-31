const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config({ path: './src/config/.env' });
const session = require('express-session');
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongodb-session');
// ---
const indexRouter = require('./src/routers/indexRouter');
// db connection
require('./src/config/dbConnection');
// db session
const sessionStore = new MongoDBStore({
  uri: process.env.DB_URL,
  collection: 'sessions',
});
// app setting
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', path.resolve(__dirname, './src/views'));
// session + flash
app.use(
  session({
    cookie: { maxAge: 60000 },
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    store: sessionStore,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.validation_errors = req.flash('validation_errors');
  res.locals.success_messages = req.flash('success_messages');
  res.locals.email = req.flash('email');
  res.locals.name = req.flash('name');
  res.locals.lastname = req.flash('lastname');

  next();
});
// passport initialize
app.use(passport.initialize());
app.use(passport.session());
// router
app.use('/', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(PORT, ' is active'));
