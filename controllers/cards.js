const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const UnAuthorizedError = require('../errors/UnAuthorizedError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.status(200).send({ cards }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка:  ${err}` }));
};

module.exports.createCard = (req, res) => {
  const newName = req.body.name;
  const newLink = req.body.link;
  return Card.create({
    owner: req.user._id,
    name: newName,
    link: newLink,
  })
    .then((card) => res.status(200).send({ card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный id пользователя' });
      }
      res.status(500).send({ message: `Произошла ошибка:  ${err}` });
    });
};

module.exports.deleteCard = (req, res) => {
  const card = Card.findById({ _id: req.userId })
  //  Card.findByIdAndDelete({ _id: req.params.id })
    //  выдает ошибку, если ни один документ не соответствует заданному фильтру
    .orFail(() => {
    //  const error = new Error('Нет карточки с таким  id   в базе');
    //  error.statusCode = 404;
      throw new NotFoundError({ message: 'Нет карточки с таким  id   в базе' });
    });
  if (card.owner.toString() === req.user._id) {
    Card.deleteOne({ _id: card._id })
      .then(res.send({ message: 'Карточка удалена.' }));
    throw new Error('Чужие карточки не удаляют');
  }
};

/* .then(() => res.status(200).send({ message: 'Карточка удалена.' }))
      .catch((err) => {
        if (err.name === 'CastError') {
          res.status(400).send({ message: 'Некорректные данные id карты ' });
        } else if (err.statusCode === 404) {
          res.status(404).send({ message: `Невалидные данные: ${err}` });
        } else {
          res.status(500).send({ message: 'Произошла ошибка' });
        }
      });
  }
};
*/
module.exports.likeCard = (req, res) => {
  const cardId = req.params.id;
  const userId = req.user._id;

  Card.findByIdAndUpdate({ _id: cardId },
    { $addToSet: { likes: userId } },
    { new: true, runValidators: true })
    .then((card) => {
      if (card) {
        res.status(200).send({ card });
      } else {
        res.status(404).send({ message: 'Нет такого id для лайка' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректные данные для лайка' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  const CardId = req.params.id;
  const UserId = req.user._id;

  Card.findByIdAndUpdate({ _id: CardId },
    { $pull: { likes: UserId } },
    { new: true, runValidators: true })
    .then((card) => {
      if (card) {
        res.status(200).send({ card });
      } else {
        res.status(404).send({ message: 'Нет такого id для лайка' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректные данные для лайка' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};
