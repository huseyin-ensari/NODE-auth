const router = require('express').Router();
const {
  registerPage,
  loginPage,
  forgotPasswordPage,
  indexPage,
  resetPasswordPage,
} = require('../controllers/pageController');
const { isLogin, isOut } = require('../middlewares/accessPages');

router.get('/', isLogin, indexPage);
router.get('/register', isOut, registerPage);
router.get('/login', isOut, loginPage);
router.get('/forgot-password', isOut, forgotPasswordPage);
router.get('/newpassword-page', isOut, resetPasswordPage);

module.exports = router;
