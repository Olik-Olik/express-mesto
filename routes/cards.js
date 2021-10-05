const cardsRouter = require('express').Router();
/*

const dislikeCard = require('../controllers/cards');
const likeCard = require('../controllers/cards');
const deleteCard = require('../controllers/cards');
const getCards = require('../controllers/cards');
const createCard = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:id', deleteCard);
cardsRouter.put('/cards/:id/likes', likeCard);
cardsRouter.delete('/cards/:id/likes', dislikeCard);

*/


const createCard = require('../controllers/cards');

cardsRouter.post('/cards', createCard);

module.exports = cardsRouter;
