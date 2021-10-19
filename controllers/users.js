const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// const validator = require("./validator"); /

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
      } else {
        res.status(404).send({ message: 'Пользователь по данному id отсутствует  в базе' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный id пользователя' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
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
        } else next();
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
  const { email } = req.body;
  const { password } = req.body;
  User.findOne({ email })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        Promise.reject(new Error('Неправильная почта, Потом исправить  или пароль')); // отклоненный
      }
      const matched = bcrypt.compare(password, user.password);
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
