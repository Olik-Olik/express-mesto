// const usersData = require('../users.json');//тестовый
const User = require('../model/user');

// Обработка ошибок Может в отдельный файл сложить , подумать
const ERROR_NOT_FOUND = 404;
// const ERROR_DATA = 400;
const ERROR_DEFAULT = 500;
const ERROR_SUCCESS = 200;

const getUsers = (req, res/* , next */) => User.find({})
  .then((users) => res.status(ERROR_SUCCESS).send(users))
  //  .catch(next)
  .catch((err) => {
    console.log(err);
    return res.status(ERROR_DEFAULT).send({ message: 'Ошибка по-умолчанию' });
  });

const getUser = (req, res) => {
  const { id } = req.params;
  return User.findById(id)
    .then((users) => {
      if (!users) {
        return res.status(ERROR_NOT_FOUND).send({ message: 'Зачем передал несуществующий id?' });
      }
      return res.status(ERROR_SUCCESS).send(users /* + req.params(id) */);
    })
    .catch((err) => {
      console.log(err);
      return res.status(ERROR_DEFAULT).send({ message: 'Ошибка по-умолчанию' });
    });
};

const createUser = (req, res) => User.create({ ...req.body })
  .then((users) => res.status(ERROR_SUCCESS).send(users))
//  .catch(next)
  .catch((err) => {
    console.log(err);
    return res.status(ERROR_DEFAULT).send({ message: 'Ошибка по-умолчанию' });
  });

/*
 const updateUser =  (req, res) => {
 const { name,
        about,
        } = req.body;
return User.findById(id, { name,
  about,
})
  .then ((user) => res.status(ERROR_SUCCESS).send( data: user) )

 const updateAvatar = (req, res) => {
  const {ava} = req.body;
   return User.findById(id,{ ava})
     .then(user) =>  res.status(ERROR_SUCCESS).send( data:user)
   }
 }

*/
module.exports = {
  getUsers, getUser, createUser,
  // updateUser, updateAvatar,
};
