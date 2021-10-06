const express = require('express');
const { validationResult } = require('express-validator');

const Card = require('../models/card');

// const ERROR_NOT_FOUND = 404;
const ERROR_DATA = 400;
// const ERROR_DEFAULT = 500;
const ERROR_SUCCESS = 200;

module.exports.getCards = (req, res, next) => {
  Card.find({})
  // populate для получения информацию об авторе истории,
    .populate('user')
    .then((cards) => res.status(ERROR_SUCCESS).send({ data: cards }))
    .catch(next);
  // .catch((err) => res.status(ERROR_DEFAULT).send({ message: 'Ошибка по-умолчанию' } );
};

module.exports.createCard = (req, res, next) => {
  const errors = validationResult(req);
  const newName = req.body.name;
  const newLink = req.body.link;
  if (!errors.isEmpty()) {
    return res.status(ERROR_DATA).json({ errors: errors.array() });
  }
  return Card.create({
    name: newName,
    link: newLink,
  },
  { owner: req.user._id },
  { new: true, returnNewDocument: true })
    .catch(() => Error('Карточка не найдена'))
    .then((card) => res.status(ERROR_SUCCESS).send({ data: card }))
    .catch(next);
  // .catch((err) => res.status(ERROR_DEFAULT).send({ message: `трампампам` })))
};

module.exports.updateCard = (req, res, next) => {
  const errors = validationResult(req);
  const newName = req.body.name;
  const newLink = req.body.link;
  /*
   const { owner } = req.user._id;
   const { likes } = req.body.likes;
   const { createdAt } = req.body.createdAt;
   */
  if (!errors.isEmpty()) {
    return res.status(ERROR_DATA).json({ errors: errors.array() });
  }
  return Card.create({
    name: newName,
    link: newLink,
  },
  { owner: req.user._id },
  { new: true, returnNewDocument: true })
    .catch(() => Error('Карточка не найдена'))
    .then((card) => res.status(ERROR_SUCCESS).send({ data: card }))
    .catch(next);
  // .catch((err) => res.status(ERROR_DEFAULT).send({ message: `Ошибка` })))
};

module.exports.deleteCard = (req, res, next) => {
  // const { id } = req.params;
  Card.findByIdAndDelete({ _id: req.user._id })
    .orFail(() => Error('Карточка не найдена'))
    .then((card) => res.status(ERROR_SUCCESS).send({ data: card }))
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  // const { id } = req.params;
  Card.findByIdAndUpdate({ _id: req.user._id },
    { likes: req.user._id },
    { new: true, returnNewDocument: true })
    .orFail(() => Error('Карточка не найдена'))
    .then((likes) => res.status(ERROR_SUCCESS).send({ data: likes }))
    .catch(next);
};
module.exports.dislikeCard = (req, res, next) => {
  // const { id } = req.params;
  Card.findByIdAndUpdate({ _id: req.user._id },
    { likes: req.user._id },
    { new: true, returnNewDocument: true })
    .orFail(() => Error('Карточка не найдена'))
    .then((likes) => res.status(ERROR_SUCCESS).send({ data: likes }))
    .catch(next);
};
