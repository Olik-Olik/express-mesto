// const errors = require('celebrate');
require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');// не нужен
const cookieParser = require('cookie-parser');
const router = require('express').Router(); // корневой роутер
const routes = require('./routes/users');
const cardRoutes = require('./routes/cards');
require('./middlewares/auth');
// const NotFoundError = require('./errors/NotFoundError');
// const InternalServerError = require('./errors/InternalServerError');
// const BadRequestError = require('../errors/BadRequestError');
// const UnAuthorizedError = require('../errors/UnAuthorizedError');
// const ConflictError = require('../errors/ConflictError');
const { createUser, login } = require('./controllers/users');
// const User = require('./models/user');
const PORT = 3621;
const app = express();
const url = 'mongodb://localhost:27017/mestodb';
const auth = require('./middlewares/auth');
const { loginValidate, userValidate } = require('./validator/validator');

// app.use(errors());
mongoose.connect(url, { useNewUrlParser: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.post('/signin', login, loginValidate);
app.post('/signup', createUser, userValidate);
app.use(auth);// все роуты ниже этой строки будут защищены
app.use(routes);
app.use(cardRoutes);
app.use((req, res) => {
  res.status(404).send({ message: 'Нет такой страницЫ' });
  // throw new NotFoundError({ message: 'Нет такой страницЫ' });
});
app.use((req, res, next, err) => {
  if (!err.name === 'ValidatorError' || !err.name === 'CastError' || !err.statusCode === 404 || !err.statusCode === 409) {
    // throw new InternalServerError({ message: 'Произошла ошибка' });
    res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
  // next();
});

app.listen(PORT, () => {
  console.log(`Express is Working in console ${PORT}`);
});
module.exports = { router };

/*
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
*/
