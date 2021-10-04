/*
// eslint-disable-next-line import/no-unresolved
const cardsData = require('../cards.json');
const User = require("../model/user");
// Обработка ошибок Может в отдельный файл сложить , подумать
const ERROR_NOT_FOUND = 404;
const ERROR_DATA = 400;
const ERROR_DEFAULT = 500;
const ERROR_SUCCESS = 200;

const getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.status(ERROR_SUCCESS).send (cardsData))
    .catch((err) => res.status(ERROR_DEFAULT).send({ message: 'Ошибка по-умолчанию' } );
}

const deleteCard = (req, res) => {
const { id} = req.params
return  Card.findById({})

module.exports = { getCards };// несколько контроллеров

cardsRouter.get('/', getCards);
cardsRouter.post('/', createNewCard);
cardsRouter.delete('/:id', deleteCard);
cardsRouter.put('/:id/likes', likeCard);
cardsRouter.delete('/:id/likes', dislikeCard); */
