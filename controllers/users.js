const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');// 404
const ConflictError = require('../errors/ConflictError');// 409
const InternalServerError = require('../errors/InternalServerError');// 500
// const Card = require('../models/card');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ users }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка:  ${err}` }));
};

module.exports.getUser = (req, res) => {
  const userId = req.params.id;
  return User.findById(userId)
    .then((user) => {
      if (user) {
        res.status(200).send({ user });
      }
      throw new NotFoundError({ message: 'Пользователь по данному id отсутствует  в базе' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный id пользователя' });
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getCurrentUser = (req, res) => {
  const userId = req.params.id;
  return User.findById(userId)
    .orFail(() => {
      throw new NotFoundError({ message: 'Пользователь по данному id отсутствует  в базе' });
    })
    .then((user) => { res.send(user); })
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  //  хешируем пароль
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    })
      .catch((err) => {
        if (err.name === 'MongoError' && err.code === 11000) {
          throw new ConflictError({ message: 'Такой email в базе есть , придумывай другой ' });
          // eslint-disable-next-line brace-style
        }
        else {
          throw new InternalServerError({ message: 'Произошла ошибка' });
        }
      })
      .then(
        (user) => {
          if (!user) {
            throw new NotFoundError({ message: 'Пользователь не создан' });
          }
          res.status(201).send({ user });
        },
      )
      .catch((err) => {
        if (err.name === 'ValidatorError') {
          res.status(400).send({ message: 'Невалидные данные Синтаксическая ошибка' });
        } else if (err.statusCode === 404) {
          res.status(404).send({ message: `Пользователь не создан, Невалидные данные: ${err}` });
        } else {
          res.status(500).send({ message: 'Произошла ошибка' });
        }
      }));
};

module.exports.updateUser = (req, res) => {
  const newName = req.body.name;
  const newAbout = req.body.about;
  return User.findByIdAndUpdate({ _id: req.user._id }, {
    name: newName,
    about: newAbout,
  }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь по данному id отсутствует  в базе');
    })
    .then((user) => res.status(200).send({ user }))

    .catch((err) => {
      if (err.name === 'ValidatorError') {
        res.status(400).send({ message: `Пользователь не изменен, Невалидные данные: ${err}` });
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный id пользователя' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: `Пользователь не изменен, Невалидные данные: ${err}` });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.login = (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  User.findOne({ email: userEmail })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильная почта или пароль')); // отклоненный
      }
      const matched = bcrypt.compare(userPassword, user.password);
      if (!matched) {
        // eslint-disable-next-line max-len
        return Promise.reject(new Error('Неправильный пароль или почта'));
      }
      const token = jwt.sign({ _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' });
      res.status(201).send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: `Необходима авторизация  ${err}` });
    });
};

module.exports.updateAvatar = (req, res) => {
  const newAvatar = req.body.avatar;

  return User.findByIdAndUpdate({ _id: req.user._id },
    { avatar: newAvatar },
    { new: true, runValidators: true })
    // если не соответствует- то 404
    .orFail(() => {
      throw new NotFoundError('Пользователь c данным id отсутствует  в базе');
    })
    .then((user) => res.status(200).send({ user }))

    .catch((err) => {
      if (err.name === 'ValidatorError') {
        res.status(400).send({ message: `Аватар не изменен, Невалидные данные: ${err}` });
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный id пользователя' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: `Аватар не изменен, Невалидные данные: ${err}` });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};
