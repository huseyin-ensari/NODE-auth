const router = require('express').Router();
const { newUserValidation } = require('../middlewares/validationMiddleware');
const { register } = require('../controllers/authController');

router.post('/register', newUserValidation(), register);

module.exports = router;
