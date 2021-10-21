const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const UnAuthorizedError = require('../errors/UnAuthorizedError');
const Card = require('../models/card');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ users }))
    .catch(next);
  // .catch((err) => res.status(500).send({ message: `Произошла ошибка:  ${err}` }));
};

module.exports.getUser = (req, res, next) => {
  const userId = req.params.id;
  return User.findById(userId)
    .then((user) => {
      if (user) {
        // res.status(200).send({ user });
        res.send(user);
      }
      throw new NotFoundError('Пользователь по данному id отсутствует  в базе');

      // else {res.status(404).send({ message: 'Пользователь по данному id отсутствует  в базе' });}
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Невалидный id пользователя');
      //  res.status(400).send({ message: 'Невалидный id пользователя' });
      }
      next(err);
      // .catch(err => next(err));
      //      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.params.id;
  return User.findById(userId)
    .orFail(() => {
      throw new NotFoundError({ message: 'Пользователь по данному id отсутствует  в базе' });
    })
    .then((user) => { res.send(user); })
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  //  хешируем пароль
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
      /*
     name: newName,
      about: newAbout,
      avatar: newAvatar,
      email: newEmail,
      password: newPassword,
      // заносим в базу */
    })
      .catch((err) => {
        if (err.name === 'MongoError' && err.code === 11000) {
          res.status(409).send({ message: 'Такой email в базе есть , придумывай другой' });
        } else next(err);
      })
      .then(
        (user) => {
          if (!user) {
            const error = new Error('Пользователь не создан');
            error.statusCode = 404;
            throw error;
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
      const error = new Error('Пользователь по данному id отсутствует  в базе');
      error.statusCode = 404;
      throw error;
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
  const user_email = req.body.email;
  const user_password = req.body.password;
  User.findOne({ email: user_email })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильная почта, Потом исправить  или пароль')); // отклоненный
      }
      const matched = bcrypt.compare(user_password, user.password);
      if (!matched) {
        // eslint-disable-next-line max-len
        return Promise.reject(new Error('Неправильный пароль, это пока для разработки потом или почта'));
      }
      // return User.findUserByCredentials(email, password)
      //   .then((user) => {
      const token = jwt.sign({ _id: user._id },
      //  'some-secret-key', { expiresIn: 3600000 * 24 * 7 });
        'some-secret-key',
        { expiresIn: '7d' });
      res.status(201).send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: `Необходима авторизация  ${err}` });
    });
};

// переходим по роуту логин и пароль есть

module.exports.updateAvatar = (req, res) => {
  const newAvatar = req.body.avatar;

  return User.findByIdAndUpdate({ _id: req.user._id },
    { avatar: newAvatar },
    { new: true, runValidators: true })
    // если не соответствует- то 404
    .orFail(() => {
      const error = new Error('Пользователь c данным id отсутствует  в базе');
      error.statusCode = 404;
      throw error;
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
