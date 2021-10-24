const bcrypt = require('bcryptjs');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');// 404
const ConflictError = require('../errors/ConflictError');// 409
const UnAuthorizedError = require('../errors/UnAuthorizedError');// 401
// const Card = require('../models/card');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  const userId = req.params.id;
  return User.findById(userId)
    .then((user) => {
      if (user) {
        res.status(200).send({ user });
      }
      throw new NotFoundError('Пользователь по данному id отсутствует  в базе');
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  return User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь по данному id отсутствует  в базе');
    })
    .then((user) => { res.send(user); })
    .catch(next);
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
    })
      .then(
        (user) => {
          if (!user) {
            throw new NotFoundError('Пользователь не создан');
          }
          res.status(201).send({
            data: {
              name: user.name,
              about: user.about,
              avatar: user.avatar,
              email: user.email,
            },
          });
        },
      )
      .catch((err) => {
        if (err.name === 'MongoError' && err.code === 11000) {
          next(new ConflictError('Такой email в базе есть , придумывай другой '));
        }
        next(err);
      })
      .then((user) => res.status(201)
        .send({
          data: {
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
          },
        }))
      .catch(next));
};

module.exports.updateUser = (req, res, next) => {
  const newName = req.body.name;
  const newAbout = req.body.about;
  return User.findByIdAndUpdate({ _id: req.userId }, {
    name: newName,
    about: newAbout,
  }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь по данному id отсутствует  в базе');
    })
    .then((user) => res.status(200).send({ user }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  return User.findUserByCredentials(userEmail, userPassword)
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
      next(new UnAuthorizedError(err.message));
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const newAvatar = req.body.avatar;

  return User.findByIdAndUpdate({ _id: req.userId },
    { avatar: newAvatar },
    { new: true, runValidators: true })
    // если не соответствует- то 404
    .orFail(() => {
      throw new NotFoundError('Пользователь c данным id отсутствует  в базе');
    })
    .then((user) => res.status(200).send({ user }))
    .catch(next);
};
