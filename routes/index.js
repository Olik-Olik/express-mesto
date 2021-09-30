const router = require('express').Router();
// eslint-disable-next-line import/extensions
const userRouter = require('./users.js');
// eslint-disable-next-line import/extensions
// const cardRouter = require('./cards.js');

// router.use('/cards', cardRouter);
router.use('/users', userRouter);

// module.exports = cardRouter;
module.exports = router;
