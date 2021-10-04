// const usersData = require('../users.json');//тестовый
const express = require('express');
const { validationResult } = require('express-validator');
const User = require('../model/user');

// const app = express();
// Обработка ошибок Может в отдельный файл сложить , подумать
// const ERROR_NOT_FOUND = 404;
const ERROR_DATA = 400;
// const ERROR_DEFAULT = 500;
const ERROR_SUCCESS = 200;

module.exports.getUsers = (req, res, next) => User.find({})
  .then((users) => res.status(ERROR_SUCCESS).send({ data: users }))
  .catch(next);

/*  User.find({}, (err, result) => {
  if (err) {
    console.log(err);
    res.status(ERROR_DEFAULT).send({ message: 'Ошибка по-умолчанию' });
  } else {
    res.json(result);
  }
}); */

/* const getUser = (req, res) => {
  const { id } = req.params;
  return User.findById(id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(ERROR_DEFAULT).send({ message: 'Ошибка по-умолчанию' });
    } else {
      res.json(result);
    }
  }); */

module.exports.getUser = (req, res, next) => {
  const id = req.params;
  return User.findById(id)
    .then((users) => res.status(ERROR_SUCCESS).send({ data: users }))
    .catch(next);
};

/*
const updateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(ERROR_DATA).json({errors: errors.array()});
  }

  const {name} = req.body.name;
  const {about} = req.body.about;
  const {avatar} = req.body.avatar;
  const user = new User({
    name,
    about,
    avatar,
  });

  user.save();
  res.status(ERROR_SUCCESS).json({user})
    .catch(next);

  /* catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  } */
/*
};
 */

module.exports.updateUser = (req, res) => {
  // const { name, about } = req.body;

  const newName = req.body.name;
  const newAbout = req.body.about;
  console.log(`Find by id ${req.user._id}`);
  console.log(`Find by id name ${newName}`);
  console.log(`Find by id body ${req}`);
//  console.log(req);

  return User.findByIdAndUpdate({ _id: req.user._id }, {
    // name, about,
    name: newName,
    about: newAbout,
  }, { new: true, returnNewDocument: true })
    .then((user) => res.status(ERROR_SUCCESS).send({ data: user }));
};
/*
const updateAvatar = (req, res) => {
const {ava} = req.body;
return User.findById(id,{ ava})
  .then(user) =>  res.status(ERROR_SUCCESS).send( data:user)
}
}

*/
// module.exports = {
//   getUsers, getUser
  // , updateUser,
  // updateUser,
  // updateAvatar,
// };
