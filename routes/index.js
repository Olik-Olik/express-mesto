const router = require('express').Router(); // корневой роутер
const userRouter = require('./users.js');
// const cardRouter = require('./cards.js');
router.use('/users', userRouter);
// localhost:3000/users/ + userRouter
// cardsRouter.use('./cards', cardRouter);
module.exports = { router /* , cardsRouter */ };
