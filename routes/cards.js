const cardsRouter = require('express').Router();
const {
  getCards,
  likeCard,
  dislikeCard,
  createNewCard,
  deleteCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createNewCard);
cardsRouter.delete('/cards/:id', deleteCard);
cardsRouter.put('/cards/:id/likes', likeCard);
cardsRouter.delete('/cards/:id/likes', dislikeCard);
module.exports = cardsRouter;
