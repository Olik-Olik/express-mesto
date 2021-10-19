const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');// не нужен
const cookieParser = require('cookie-parser');
const router = require('express').Router(); // корневой роутер
const routes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const { createUser, login } = require('./controllers/users');

require('dotenv').config;

const PORT = 3621;
const app = express();
const url = 'mongodb://localhost:27017/mestodb';
mongoose.connect(url, { useNewUrlParser: true });

app.post('/signin', login);
app.post('/signup', createUser);

// app.use(express.json());
// app.use(express.urlencoded());// Строка в кодировке URL,
// как правило, не является допустимой строкой JSON.
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', auth, users);
// app.use('/', auth, cards);
app.use(bodyParser.urlencoded({ extended: true }));
// анализирует только тела входа перед обработчиком и смотреть если будет нужный тип.
// extended: true на все типы
// преобразует текстовый ввод JSON в переменные, доступные для JS в разделе req.body

app.use((req, res, next) => {
  req.user = {
    _id: '6158c018363c506cb10e4747',
  };
  next();
});

app.use(routes);
app.use(cardRoutes);
app.use((req, res) => {
  res.status(404).send({ message: 'Нет такой страницЫ' });
});

app.listen(PORT, () => {
  console.log(`Express is Working in console ${PORT}`);
});
module.exports = { router };
