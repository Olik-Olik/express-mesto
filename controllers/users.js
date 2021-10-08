// const usersData = require('../users.json');//тестовый
// const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const { validationFuture } = require('express-validator');
const User = require('../models/user');

// const app = express();
// get post  400,500
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка:  ${err}` })
      .catch(next));
};
// get post  400,500, 404
module.exports.getUser = (req, res) => {
  const id = req.user._id;
  return User.findById(id)
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        res.status(404).send({ message: 'Пользователь по данному id отсутствует  в базе' });
      }
    })
  /*
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь по данному id отсутствует  в базе' });
      }
      res.status(200).send({ data: user }); // присутствует
    }) */
    .catch((err) => {
      // объект err содержит поле name, которое указывает тип ошибки
      if (err.name === 'CastError') {
        //  переданы некорректные данные в методы создания карточки,
        //  пользователя, обновления аватара пользователя или профиля;
        res.status(400).send({ message: 'Невалидный id пользователя' });
        // карточка или пользователь не найден
      } /* else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else { */
      // ошибка по-умолчанию иначе
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};
// get post  400,500
module.exports.createUser = (req, res, next) => {
  const newName = req.body.name;
  const newAbout = req.body.about;
  const newAvatar = req.body.avatar;
  const errors = validationFuture(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return User.create({
    name: newName,
    about: newAbout,
    avatar: newAvatar,
  })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'validationError') {
        res.status(400).send({ message: 'Невалидные данные' });
      }
      res.status(500).send(err);
    })
    .catch(next);
};
// patch  404 ,500, 400
module.exports.updateUser = (req, res, next) => {
  const newName = req.body.name;
  const newAbout = req.body.about;
  console.log(`Find by id ${req.user._id}`);
  console.log(`Find by id name ${newName}`);
  console.log(`Find by id body ${req}`);
  return User.findByIdAndUpdate({ _id: req.user._id }, {
    name: newName,
    about: newAbout,
  }, { new: true, runValidators: true })
  // если не соответствует- то 404
    .orFail(() => {
      const error = new Error('Пользователь по данному id отсутствует  в базе');
      error.statusCode = 404;
      throw error;
    })
  // иначе-все круто 200
    .then((user) => res.status(200).send({ data: user }))

    // иначе ловим  ошибки
    .catch((err) => {
      if (err.name === 'validationError') {
        res.status(400).send({ message: `Пользователь не изменен, Невалидные данные: ${err}` });
      }
      //  все остальные
      res.status(500).send(err);
    })
    .catch(next);
};

// patch  404 ,500, 400
module.exports.updateAvatar = (req, res, next) => {
  const newAvatar = req.body.avatar;
  console.log(`Find by id avatar ${newAvatar}`);
  console.log(`Ava by id ${req.user._id}`);
  return User.findByIdAndUpdate({ _id: req.user._id },
    { avatar: newAvatar },
    { new: true, runValidators: true })

    // если не соответствует- то 404
    .orFail(() => {
      const error = new Error('Пользователь по данному id отсутствует  в базе');
      error.status = 404;
      throw error;
    })
    // иначе-все круто -200
    .then((user) => res.status(200).send({ data: user }))

    // иначе ловим  ошибки
    .catch((err) => {
      if (err.name === 'validationError') {
        res.status(400).send({ message: `Аватар не изменен, Невалидные данные: ${err}` });
      }
      //  все остальные
      res.status(500).send(err);
    })
    .catch(next);
};
