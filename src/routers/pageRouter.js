const router = require('express').Router();

const { registerPage, loginPage, forgotPasswordPage } = require('../controllers/pageController');

router.get("/register", registerPage)

router.get("/login", loginPage)

router.get("/forgot-password", forgotPasswordPage)

module.exports = router