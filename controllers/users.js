// const usersData = require('../users.json');//тестовый
const express = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/user');

const app = express();

//  const ERROR_NOT_FOUND = 404;
const ERROR_DATA = 400;
// const ERROR_DEFAULT = 500;
const ERROR_SUCCESS = 200;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

/*
/!*  User.find({}, (err, result) => {
  if (err) {
    console.log(err);
    res.status(500).send({ message: 'Ошибка по-умолчанию' });
  } else {
    res.json(result);
  }
});
 const getUser = (req, res) => {
  const { id } = req.params;
  User.findById(id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(ERROR_DEFAULT).send({ message: 'Ошибка по-умолчанию' });
    } else {
      res.json(result);
    }
  }); */

module.exports.getUser = (req, res, next) => {
  const id = req.user._id;
  return User.findById(id)
    .then((user) => res.status(ERROR_SUCCESS).send({ data: user }))
    .then((users) => res.status(ERROR_SUCCESS).send({ data: users }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const newName = req.body.name;
  const newAbout = req.body.about;
  const newAvatar = req.body.avatar;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(ERROR_DATA).json({ errors: errors.array() });
  }
  return User.create({
    name: newName,
    about: newAbout,
    avatar: newAvatar,
  })
    .then((user) => res.status(ERROR_SUCCESS).send({ data: user }))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const newName = req.body.name;
  const newAbout = req.body.about;
  console.log(`Find by id ${req.user._id}`);
  console.log(`Find by id name ${newName}`);
  console.log(`Find by id body ${req}`);
  return User.findByIdAndUpdate({ _id: req.user._id }, {
    name: newName,
    about: newAbout,
  }, { new: true, returnNewDocument: true })
    .orFail(() => Error('Карточка не найдена'))
    .then((user) => res.status(ERROR_SUCCESS).send({ data: user }))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const newAvatar = req.body.avatar;
  console.log(`Find by id avatar ${newAvatar}`);
  console.log(`Ava by id ${req.user._id}`);
  return User.findByIdAndUpdate({ _id: req.user._id },
    { avatar: newAvatar },
    { new: true, returnNewDocument: true })
    .orFail(() => Error('Карточка не найдена'))
    .then((user) => res.status(ERROR_SUCCESS).send({ data: user }))
    .catch(next);
};
