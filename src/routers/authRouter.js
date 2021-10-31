const router = require('express').Router();
const {
  newUserValidation,
  loginValidation,
} = require('../middlewares/validationMiddleware');
const { register, login } = require('../controllers/authController');

router.post('/register', newUserValidation(), register);
router.post('/login', loginValidation(), login);

module.exports = router;
