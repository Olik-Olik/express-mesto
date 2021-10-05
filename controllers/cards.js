const express = require('express');
const { validationResult } = require('express-validator');
// const cardsData = require('../cards.json');
const Card = require('../models/card');
// const User = require('../models/user');

// const ERROR_NOT_FOUND = 404;
const ERROR_DATA = 400;
const ERROR_DEFAULT = 500;
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
  const { name } = req.body.name;
  const { link } = req.body.link;
  const { owner } = req.user._id;
    const { likes } = req.body.likes;
   const { createdAt } = req.body.createdAt;
  if (!errors.isEmpty()) {
    return res.status(ERROR_DATA).json({ errors: errors.array() });
  }
  return Card.create({
    name,
    link,
  },
  { owner: req.user._id }, { new: true, returnNewDocument: true })
    .then((card) => res.status(ERROR_SUCCESS).send({ data: card }))
    .catch(next);
  // .catch((err) => res.status(ERROR_DEFAULT).send({ message: `Ошибка` })))
};


module.exports.deleteCard = (req, res) => {
Card.findById(req.user._id )
return  Card.findById({})
