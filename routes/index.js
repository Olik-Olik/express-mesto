const router = require('express').Router(); // корневой роутер
const userRouter = require('./users');
const cardsRouter = require('./cards');

router.use('/cards', cardsRouter);
router.use('/users', userRouter); // localhost:3000/users/ + userRouter

/* //  .then((card) => res.status(ERROR_SUCCESS).send({ data: card }))
      .catch(() => res.status(404).send({ message: 'Здесь нужен ответ ' }));
});
*/

/*router.use((req, res) =>
{ res.status(404).send({ message: 'Нет такого роута' }); });*/

module.exports = { router };
