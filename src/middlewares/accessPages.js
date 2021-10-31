const isLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', ['Please first login']);
  return res.redirect('/login');
};

const isOut = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/');
};

module.exports = { isLogin, isOut };
