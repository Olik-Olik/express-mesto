const router = require('express').Router(); // корневой роутер
const userRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/cards', cardsRouter);
router.use('/users', userRouter); // localhost:3000/users/ + userRouter

module.exports = { router };
