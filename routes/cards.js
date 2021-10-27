const cardsRouter = require('express').Router();

// const validator = require("./validator"); // or where your file is located

const { getCards } = require('../controllers/cards');
const { dislikeCard } = require('../controllers/cards');
const { likeCard } = require('../controllers/cards');
const { deleteCard } = require('../controllers/cards');
const { createCard } = require('../controllers/cards');
const { cardValidate } = require('../validator/validator');
const { idValidator, idParamsValidator } = require('../validator/validator');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', cardValidate, createCard);
cardsRouter.delete('/cards/:id', idParamsValidator, deleteCard);
cardsRouter.put('/cards/:id/likes', idValidator, likeCard);
cardsRouter.delete('/cards/:id/likes', idValidator, dislikeCard);

module.exports = cardsRouter;
