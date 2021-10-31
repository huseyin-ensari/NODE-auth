const asyncErrorHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const passport = require('passport');
const emailSender = require('../helpers/emailSender');
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

const logout = asyncErrorHandler((req, res, next) => {
  req.logout();
  req.session.destroy((err) => {
    res.clearCookie('connect.sid');
    return res.redirect('/login');
  });
});

const forgotPassword = asyncErrorHandler(async (req, res, next) => {
  const validationErrors = validationResult(req);

  const { email } = req.body;
  req.flash('email', email);

  if (!validationErrors.isEmpty()) {
    req.flash('validation_errors', validationErrors.array());
    return res.redirect('/forgot-password');
  }

  const user = await User.findOne({ email });

  if (!user) {
    req.flash('validation_errors', [{ msg: 'User not found' }]);
    return res.redirect('/forgot-password');
  }

  const { JWT_SECRET_KEY } = process.env;

  const payload = {
    id: user._id,
    email: user.email,
  };
  // { expiresIn: "1d" }
  const token = jsonwebtoken.sign(payload, JWT_SECRET_KEY, { expiresIn: 60 });

  const resetPasswordUrl = `${process.env.APP_URL}/newpassword-page?resetPasswordToken=${token}`;

  const emailHtmlTemplate = `
    <h3>Reset Password Link</h3>
    <p>If you want reset password. Click the <a href='${resetPasswordUrl}' target='_blank'>link</a>   </p>
  `;

  try {
    await emailSender({
      from: process.env.SMTP_USER,
      to: user.email,
      subject: 'Reset your password',
      html: emailHtmlTemplate,
    });
  } catch (error) {
    req.flash('validation_errors', [{ msg: 'An error was encountered' }]);
    return res.render('/forgot-password');
  }
  req.flash('validation_errors', [{ msg: 'Please check email' }]);
  return res.redirect('/login');
});

const resetPassword = asyncErrorHandler(async (req, res, next) => {
  const validationErrors = validationResult(req);
  const { password, token } = req.body;

  if (!validationErrors.isEmpty()) {
    return res.render('new-password', {
      token,
      validation_errors: validationErrors.array(),
    });
  }

  jsonwebtoken.verify(
    token,
    process.env.JWT_SECRET_KEY,
    async (err, decoded) => {
      if (err) {
        return res.render('new-password', {
          token,
          validation_errors: [{ msg: 'Broken Link' }],
        });
      }

      const user = await User.findById(decoded.id);

      if (!user) {
        return res.render('new-password', {
          token,
          validation_errors: [{ msg: 'User Not Found' }],
        });
      }

      bcrypt.hash(password, 10).then(async (hash) => {
        user.password = hash;
        await user.save();
        return res.render('login');
      });
    }
  );
});

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
};
