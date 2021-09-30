const express = require('express');
// const mongoose = require('mongoose');
const app = express();
const path = require('path');
const routes = require('./routes');

const PORT = 3000;

// const url = 'mongodb://localhost:27017/mestodb';
// подключаем мидлвары, роуты и всё остальное...
// const cards = require('./routes/cards');
// const users = require('./routes/users');

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(' Express is Working');
});

// app.listen(PORT, () => {
// eslint-disable-next-line no-console
//  console.log('Express is Working');
// });

// mongoose.connect(url, {
//  useNewUrlParser: true,
//  useCreateIndex: true,
//  useFindAndModify: false,
// });
