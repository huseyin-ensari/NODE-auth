const router = require('express').Router();
const {
  newUserValidation,
  loginValidation,
  emailValidation,
  newPasswordValidation,
} = require('../middlewares/validationMiddleware');
const {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

router.post('/register', newUserValidation(), register);
router.post('/login', loginValidation(), login);
router.get('/logout', logout);
router.post('/forgot-password', emailValidation(), forgotPassword);
router.post('/reset-password', newPasswordValidation(), resetPassword);

module.exports = router;
