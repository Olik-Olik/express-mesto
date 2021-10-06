const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const routes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const PORT = 3202;
const app = express();
const url = 'mongodb://localhost:27017/mestodb';
mongoose.connect(url, { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  req.user = {
    _id: '6158c018363c506cb10e4747',
  };
  next();
});

app.use(express.json());
app.use(routes);
app.use(cardRoutes);
app.listen(PORT, () => {
  console.log(` Express is Working in console ${PORT}`);
});
