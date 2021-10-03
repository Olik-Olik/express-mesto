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
    .then((cards) => res.status().send (cardsData))
    .catch((err) => res.status().send ( )));
}

delete

const { id} = req.params
return  Card.findById({})





module.exports = { getCards };// несколько контроллеров
