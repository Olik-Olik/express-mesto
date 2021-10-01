const router = require('express').Router();

// eslint-disable-next-line import/extensions
const userRouter = require('./users.js');

router.use('/users', userRouter);
// localhost:3000/users/ + userRouter

module.exports = router;
