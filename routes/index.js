const router = require('express').Router(); // корневой роутер
const userRouter = require('./users');
router.use('/users', userRouter);
// localhost:3000/users/ + userRouter
module.exports = { router };
