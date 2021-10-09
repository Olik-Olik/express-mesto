const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.status(200).send({ data: cards }))
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
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidatorError') {
        res.status(400).send({ message: 'Невалидные данные' });
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный id пользователя' });
      }
      res.status(500).send({ message: `Произошла ошибка:  ${err}` });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete({ _id: req.params.id })
    .orFail(() => res.status(400).send({ message: 'Карточка не удалена.' }))
    .then(() => res.status(200).send());
};

module.exports.likeCard = (req, res) => {
  const CardId = req.params.id;
  const UserId = req.user._id;

  Card.findByIdAndUpdate({ _id: CardId },
    { $addToSet: { likes: UserId } },
    { new: true, runValidators: true })

    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      } else {
        res.status(404).send({ message: 'Нет такого id для лайка' });
      }
    })
    // но мы ставим catch, ищем кастомные ошибки
    .catch((err) => {
      // объект err содержит поле name, которое указывает тип ошибки
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректные данные для лайка' });
        // карточка или пользователь не найден
      }
      // ошибка по-умолчанию иначе
      res.status(500).send({ message: 'Произошла ошибка' });
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
        res.status(200).send({ data: card });
      } else {
        res.status(404).send({ message: 'Нет такого id для лайка' });
      }
    })
  // но мы ставим catch, ищем кастомные ошибки
    .catch((err) => {
      // объект err содержит поле name, которое указывает тип ошибки
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Некорректные данные для лайка' });
        // карточка или пользователь не найден
      }
      // ошибка по-умолчанию иначе
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};
