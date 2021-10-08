// const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const { validationError } = require('express-validator');

// const { Model, PopulateOptions } = require('mongoose');
const Card = require('../models/card');
// const User = require('../models/user');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка:  ${err}` })
      .catch(next));
};

module.exports.createCard = (req, res) => {
  const errors = validationError(req);
  const newName = req.body.name;
  const newLink = req.body.link;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return Card.create({
    owner: req.user._id,
    name: newName,
    link: newLink,
  })
    .then((card) => res.status(200).send({ data: card }))

    .catch((err) => {
      if (err.name === 'validationError') {
        res.status(400).send({ message: 'Невалидные данные' });
      }
      res.status(500).send(err);
    });
  /* .catch(() => res.status(400).send({ message: 'Карточка не созданна.' })); */
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete({ _id: req.params.id })

    .orFail(() => res.status(400).send({ message: 'Карточка не удалена.' }))
    .then(() => res.status(200).send())
    .catch(next);
};

module.exports.likeCard = (req, res) => {
  const CardId = req.params.id;
  const UserId = req.user._id;

  Card.findByIdAndUpdate({ _id: CardId },
    { $addToSet: { likes: UserId } },
    { new: true, returnNewDocument: true, runValidators: true })

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
      } /* else if (err.statusCode === 404) {
        res.status(404).send({ message: 'Нет такого id для лайка' });
      } else { */
      // ошибка по-умолчанию иначе
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  const CardId = req.params.id;
  const UserId = req.user._id;

  Card.findByIdAndUpdate({ _id: CardId },
    { $pull: { likes: UserId } },
    { new: true, returnNewDocument: true, runValidators: true })

  //  ловим, возвращаем - Ура, 200 ошибка
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
      } /* else if (err.statusCode === 404) {
        res.status(404).send({ message: 'Нет такого id для лайка' });
      } else { */
      // ошибка по-умолчанию иначе
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};
