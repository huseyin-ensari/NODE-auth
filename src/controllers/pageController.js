const registerPage = (req, res, next) => {
  res.render('register');
};

const loginPage = (req, res, next) => {
  res.render('login');
};

const forgotPasswordPage = (req, res, next) => {
  res.render('forgot-password');
};

module.exports = {
  registerPage,
  loginPage,
  forgotPasswordPage,
};