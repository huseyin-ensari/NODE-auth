const asyncErrorHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const passport = require('passport');
const User = require('../models/User');
require('../config/auth/passportLocal')(passport);

const register = asyncErrorHandler(async (req, res, next) => {
  const { name, lastname, email, password } = req.body;

  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    req.flash('validation_errors', validationErrors.array());

    req.flash('name', name);
    req.flash('lastname', lastname);
    req.flash('email', email);

    return res.redirect('/register');
  }

  const emailIsExist = await User.findOne({ email });
  if (emailIsExist) {
    req.flash('validation_errors', [{ msg: 'Email is exist' }]);
    return res.redirect('/register');
  }

  bcrypt.hash(password, 10).then(async (hash) => {
    await User.create({
      name,
      lastname,
      email,
      password: hash,
    }).then((user) => {
      req.flash('success_message', [{ msg: 'Register is Successfuly' }]);
      return res.redirect('/login');
    });
  });
});

const login = asyncErrorHandler(async (req, res, next) => {
  const validationErrors = validationResult(req);
  req.flash('email', req.body.email);
  if (!validationErrors.isEmpty()) {
    req.flash('validation_errors', validationErrors.array());

    return res.redirect('/login');
  }

  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next);
});

module.exports = { register, login };
