const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const routes = require('./routes');

const PORT = 3000;

const app = express();
const url = 'mongodb://localhost:27017/mestodb';

mongoose.connect(url, { useNewUrlParser: true });

// const cards = require('./routes/cards');
// const users = require('./routes/users');

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
// для обработки bodyParser POST запросы
app.use(express.json());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(' Express is Working in console');
});
