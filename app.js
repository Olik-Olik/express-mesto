// const errors = require('celebrate');
require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');// не нужен
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('express').Router(); // корневой роутер
const routes = require('./routes/users');
const cardRoutes = require('./routes/cards');
require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');

const { createUser, login } = require('./controllers/users');

const PORT = 3621;
const app = express();
const url = 'mongodb://localhost:27017/mestodb';
const auth = require('./middlewares/auth');
const { loginValidate, userValidate } = require('./validator/validator');

mongoose.connect(url, { useNewUrlParser: true }, { useNewUrlParser: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.post('/signin', loginValidate, login);
app.post('/signup', userValidate, createUser);
app.use(auth);// все роуты ниже этой строки будут защищены
app.use(routes);
app.use(cardRoutes);
app.use(errors());
app.use(() => {
// if (err.statusCode === 404)
//  res.status(404).send({ message: 'Нет такой страницЫ' });
  throw new NotFoundError('Нет такой страницЫ');
});
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
  console.log(`Express is Working in console ${PORT}`);
});
module.exports = { router };
