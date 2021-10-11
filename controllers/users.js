const User = require('../models/user');

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
module.exports.createUser = (req, res) => {
  const newName = req.body.name;
  const newAbout = req.body.about;
  const newAvatar = req.body.avatar;

  return User.create({
    name: newName,
    about: newAbout,
    avatar: newAvatar,
  })
    .then(
      (user) => {
        if (!user) {
          const error = new Error('Пользователь не создан');
          error.statusCode = 404;
          throw error;
        }
        res.status(200).send({ user });
      },
    )
    .catch((err) => {
      if (err.name === 'ValidatorError') {
        res.status(400).send({ message: 'Невалидные данные' });
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: `Пользователь не создан, Невалидные данные: ${err}` });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
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
