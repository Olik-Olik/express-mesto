const cardsRouter = require('express').Router();
// const {
//  getCards,
//  likeCard,
//  dislikeCard,
//  createNewCard,
//  deleteCard,
// } = require('../controllers/cards');

const { getCards } = require('../controllers/cards').getCards;
const { createCard } = require('../controllers/cards').createCard;

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:id', deleteCard);
cardsRouter.put('/cards/:id/likes', likeCard);
cardsRouter.delete('/cards/:id/likes', dislikeCard);
module.exports = cardsRouter;
