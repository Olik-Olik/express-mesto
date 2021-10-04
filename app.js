const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/users');
// const cardRoutes = require('./routes/cards');
const PORT = 3063;
const app = express();
const url = 'mongodb://localhost:27017/mestodb';
mongoose.connect(url, { useNewUrlParser: true });
// const bodyParser = require('body-parser');
// const cards = require('./routes/cards');
// const users = require('./routes/users');

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  req.user = {
    _id: '6158c018363c506cb10e4747',
  };
  next();
});

// app.use(cardRoutes);
// app.use(bodyParser.json());
//  express.json() для запросов POST и PUT,
//  поскольку  мы отправляем  объект данных
//  на сервер и просим сервер принять или сохранить .
//  те данные (объект), которые заключены (в теле req.body) этого (POST или PUT) запроса
app.use(express.json());
// app.use(express.urlencoded());
app.use(routes);

app.listen(PORT, () => {
  console.log(` Express is Working in console ${PORT}`);
});
