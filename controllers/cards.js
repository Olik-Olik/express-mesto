const express = require('express');
const { validationResult } = require('express-validator');

const { Model, PopulateOptions } = require('mongoose');
const Card = require('../models/card');

// const ERROR_NOT_FOUND = 404;
const ERROR_DATA = 400;
// const ERROR_DEFAULT = 500;
const ERROR_SUCCESS = 200;

module.exports.getCards = (req, res, next) => {
  Card.find({})

    .populate('user')
    .then((cards) => res.status(ERROR_SUCCESS).send({ data: cards }))
    .catch(next);
  // .catch((err) => res.status(ERROR_DEFAULT).send({ message: 'Ошибка по-умолчанию' } );
};

module.exports.createCard = (req, res) => {
  const errors = validationResult(req);
  const newName = req.body.name;
  const newLink = req.body.link;
  if (!errors.isEmpty()) {
    return res.status(ERROR_DATA).json({ errors: errors.array() });
  }
  return Card.create({
    owner: req.user._id,
    name: newName,
    link: newLink,
  })
    .then((card) => res.status(ERROR_SUCCESS).send({ data: card }))
    .catch(() => res.status(ERROR_DATA).send({ message: 'Карточка не созданна.' }));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete({ _id: req.params.id })
    .orFail(() => res.status(ERROR_DATA).send({ message: 'Карточка не удалена.' }))
    .then(() => res.status(ERROR_SUCCESS).send())
    .catch(next);
};

/*
module.exports.likeCard = (req, res, next) => {
  const CardId = req.params._id;
  const UserId = req.user._id;
  Card.findByIdAndUpdate(CardId)
.populate(['likes']
 populate(path: string | any, select?: string | any, model?: string | Model<any, THelpers>, match?: any): this;
populate(options: PopulateOptions | Array<PopulateOptions>): this;
*/

// найти по id
// добавить, если нет $addToSet!!!!!!

module.exports.likeCard = (req, res, next) => {
  const CardId = req.params.id;
  const UserId = req.user._id;

  Card.findByIdAndUpdate({ _id: CardId },
    { $addToSet: { likes: UserId } },
    { new: true, returnNewDocument: true })
    .orFail((err) => res.status(ERROR_DATA).send({ message: 'Карточка не лайкнута: ' + err }))
    .then((data) => res.status(ERROR_SUCCESS).send({ data }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  const CardId = req.params.id;
  const UserId = req.user._id;

  Card.findByIdAndUpdate({ _id: CardId },
    { $pull: { likes: UserId } },
    { new: true, returnNewDocument: true })
    .orFail((err) => res.status(ERROR_DATA).send({ message: 'Карточка не дислайкнута.' }))
    .then((data) => res.status(ERROR_SUCCESS).send({ data }))
    .catch(next);
};
