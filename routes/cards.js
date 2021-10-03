const cardsRouter = require('express').Router();

const { getCards } = require('../controllers/cards');

cardsRouter.get('/', getCards);
const {
  likeCard,
  dislikeCard,
  createNewCard,
  deleteCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createNewCard);
cardsRouter.delete('/:id', deleteCard);
cardsRouter.put('/:id/likes', likeCard);
cardsRouter.delete('/:id/likes', dislikeCard);

module.exports = cardsRouter;

