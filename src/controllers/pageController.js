const registerPage = (req, res, next) => {
  res.render('register');
};

const loginPage = (req, res, next) => {
  res.render('login');
};

const forgotPasswordPage = (req, res, next) => {
  res.render('forgot-password');
};

const indexPage = (req, res, next) => {
  const { name, lastname } = req.user;

  res.render('index', { name, lastname });
};

const resetPasswordPage = (req, res, next) => {
  const token = req.query.resetPasswordToken;

  if (!token) {
    req.flash('validation_errors', [{ msg: 'Broken Link' }]);
    return res.redirect('/forgot-password');
  }

  return res.render('new-password', { token });
};

module.exports = {
  registerPage,
  loginPage,
  forgotPasswordPage,
  indexPage,
  resetPasswordPage,
};
