const router = require('express').Router();
const pageRouter = require('./pageRouter');

router.use('/', pageRouter);

module.exports = router;