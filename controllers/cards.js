const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');// 404 например, когда мы не нашли ресурс по переданному _id;
const BadRequestError = require('../errors/BadRequestError');// 400 когда с запросом что-то не так; eslint-disable-next-line max-len
// const UnAuthorizedError = require('../errors/UnAuthorizedError');
// 401 когда что-то не так при аутентификации или авторизации;
// const ConflictError = require('../errors/ConflictError');// 409 Conflict
// const User = require('../models/user');
// const InternalServerError = require('../errors/InternalServerError');
// const {updateUserValidate} = require("../validator/validator");

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.status(200).send({ cards }))
/*    .catch((err) => res.status(500).send({ message: `Произошла ошибка:  ${err.message}` }))*/;
};

module.exports.createCard = (req, res) => {
  const newName = req.body.name;
  const newLink = req.body.link;
  return Card.create({
    owner: req.userId,
    name: newName,
    link: newLink,
  })
    .then((card) => res.status(200).send({ card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Невалидный id пользователя');
      }
      res.status(500).send({ message: `Произошла ошибка:  ${err.message}` });
    });
};

module.exports.deleteCard = (req, res, next) => {
  const cardId = req.params.id;
  Card.findById({ _id: cardId })
    //  выдает ошибку, если ни один документ не соответствует id
    .orFail(() => {
      throw new NotFoundError('Нет карточки с таким id в базе');
    })
    .then((card) => {
      // если собственник идентичен текущему юзеру
      console.log(`owner id ${card.owner.toString()}`);
      console.log(`user  id ${req.userId}`);
      if (card.owner.toString() === req.userId) {
        Card.deleteOne({ _id: cardId })
          .then(() => res.status(200).send({ message: 'Карточка удалена.' }));
      }
      throw new Error('Чужие карточки не удаляют');
    }).catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const cardId = req.params.id;
  const userId = req.user._id;

  Card.findByIdAndUpdate({ _id: cardId },
    { $addToSet: { likes: userId } },
    { new: true, runValidators: true })
    .then((card) => {
      if (card) {
        res.status(200).send({ card });
      } else {
        throw new NotFoundError('Нет такого id для лайка');
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  const CardId = req.params.id;
  const UserId = req.user._id;

  Card.findByIdAndUpdate({ _id: CardId },
    { $pull: { likes: UserId } },
    { new: true, runValidators: true })
    .then((card) => {
      if (card) {
        res.status(200).send({ card });
      } else {
        throw new NotFoundError({ message: 'Нет такого id для лайка' });
      }
    })
    .catch(next);
};
