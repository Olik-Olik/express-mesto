const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');// 404
const BadRequestError = require('../errors/BadRequestError');// 400
const UnAuthorizedError = require('../errors/UnAuthorizedError');// 401
const ConflictError = require('../errors/ConflictError');// 409
const InternalServerError = require('../errors/InternalServerError');// 500
// const Card = require('../models/card');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ users }))
    .catch(() => {
      throw new InternalServerError({ message: 'Произошла ошибка' });
    })
  // .catch((err) => res.status(500).send({ message: `Произошла ошибка:  ${err}` }));
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  const userId = req.params.id;
  return User.findById(userId)
    .then((user) => {
      if (user) {
        // res.status(200).send({ user });
        res.send(user);
      }
      throw new NotFoundError({ message: 'Пользователь по данному id отсутствует  в базе' });

      // else {res.status(404).send({ message: 'Пользователь по данному id отсутствует  в базе' });}
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Невалидный id пользователя');
      //  res.status(400).send({ message: 'Невалидный id пользователя' });
      }
      // next(err);
      // .catch(err => next(err));
      //      res.status(500).send({ message: 'Произошла ошибка' });
    })
    .catch(() => {
      throw new InternalServerError({ message: 'Произошла ошибка' });
    })
    .catch((err) => next(err));
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.params.id;
  return User.findById(userId)
    .orFail(() => {
      throw new NotFoundError({ message: 'Пользователь по данному id отсутствует  в базе' });
    })
    .then((user) => { res.send(user); })
    .catch(() => {
      throw new InternalServerError({ message: 'Произошла ошибка' });
    })
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
          throw new ConflictError({ message: 'Такой email в базе есть , придумывай другой ' });
          // eslint-disable-next-line brace-style
        }
        //  res.status(409).send({ message: 'Такой email в базе есть , придумывай другой' });
        else {
          throw new InternalServerError({ message: 'Произошла ошибка' });
        }
        // next(err);
      })
      .then(
        (user) => {
          if (!user) {
            throw new NotFoundError({ message: 'Пользователь не создан' });
          //  const error = new Error('Пользователь не создан');
          //  error.statusCode = 404;
          // throw error;
          }
          res.status(201).send({ user });
        },
      )
      .catch((err) => {
        if (err.name === 'ValidatorError') {
          throw new BadRequestError({ message: 'Невалидные данные Синтаксическая ошибка' });
        // res.status(400).send({ message: 'Невалидные данные Синтаксическая ошибка' });
        } else if (err.statusCode === 404) {
          throw new NotFoundError({ message: `Пользователь не создан, Невалидные данные: ${err}` });
          // res.status(404).send({ message: `Пользователь не создан, Невалидные данные: ${err}` });
        } else {
          throw new InternalServerError({ message: 'Произошла ошибка' });
          // next(err);
          // res.status(500).send({ message: 'Произошла ошибка' });
        }
      }))
    .catch((err) => next(err));
};

module.exports.updateUser = (req, res, next) => {
  const newName = req.body.name;
  const newAbout = req.body.about;
  return User.findByIdAndUpdate({ _id: req.user._id }, {
    name: newName,
    about: newAbout,
  }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь по данному id отсутствует  в базе');
      // const error = new Error('Пользователь по данному id отсутствует  в базе');
      // error.statusCode = 404;
      // throw error;
    })
    .then((user) => res.status(200).send({ user }))

    .catch((err) => {
      if (err.name === 'ValidatorError') {
        throw new BadRequestError({ message: `Пользователь не изменен, Невалидные данные: ${err}` });
        // res.status(400).send({ message: `Пользователь не изменен, Невалидные данные: ${err}` });
      }
      if (err.name === 'CastError') {
        throw new BadRequestError({ message: 'Невалидный id пользователя' });
        // res.status(400).send({ message: 'Невалидный id пользователя' });
      } else if (err.statusCode === 404) {
        throw new NotFoundError({ message: `Пользователь не изменен, Невалидные данные: ${err}` });
        // res.status(404).send({ message: `Пользователь не изменен, Невалидные данные: ${err}` });
      } else {
        throw new InternalServerError({ message: 'Произошла ошибка' });
      //  next(err);
        // res.status(500).send({ message: 'Произошла ошибка' });
      }
    })
    .catch((err) => next(err));
};

module.exports.login = (req, res, next) => {
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
      // return User.findUserByCredentials(email, password)
      //   .then((user) => {
      const token = jwt.sign({ _id: user._id },
      //  'some-secret-key', { expiresIn: 3600000 * 24 * 7 });
        'some-secret-key',
        { expiresIn: '7d' });
      res.status(201).send({ token });
    })
    .catch((err) => {
      throw new UnAuthorizedError({ message: `Необходима авторизация  ${err}` });
      // res.status(401).send({ message: `Необходима авторизация  ${err}` });
    })
    .catch((err) => next(err));
};

// переходим по роуту логин и пароль есть

module.exports.updateAvatar = (req, res, next) => {
  const newAvatar = req.body.avatar;

  return User.findByIdAndUpdate({ _id: req.user._id },
    { avatar: newAvatar },
    { new: true, runValidators: true })
    // если не соответствует- то 404
    .orFail(() => {
      throw new NotFoundError({ message: 'Пользователь c данным id отсутствует  в базе' });
      // const error = new Error('Пользователь c данным id отсутствует  в базе');
      // error.statusCode = 404;
      // throw error;
    })
    .then((user) => res.status(200).send({ user }))

    .catch((err) => {
      if (err.name === 'ValidatorError') {
        throw new BadRequestError({ message: `Аватар не изменен, Невалидные данные: ${err}` });
        // res.status(400).send({ message: `Аватар не изменен, Невалидные данные: ${err}` });
      }
      if (err.name === 'CastError') {
        throw new BadRequestError({ message: 'Невалидный id пользователя' });
        //  res.status(400).send({ message: 'Невалидный id пользователя' });
      } else if (err.statusCode === 404) {
        throw new NotFoundError({ message: `Аватар не изменен, Невалидные данные: ${err}` });
        // res.status(404).send({ message: `Аватар не изменен, Невалидные данные: ${err}` });
      } else {
        throw new InternalServerError({ message: 'Произошла ошибка' });
        // next(err);
        //  res.status(500).send({ message: 'Произошла ошибка' });
      }
    })
    .catch((err) => next(err));
};
