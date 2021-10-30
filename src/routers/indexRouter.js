const router = require('express').Router();
const pageRouter = require('./pageRouter');
const authRouter = require('./authRouter');

router.use('/', pageRouter);
router.use('/users', authRouter);

module.exports = router;
