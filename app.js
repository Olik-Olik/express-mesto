const express = require('express');
const http = require('http');
const path = require('path');
const routes = require('./routes');
const {PORT = 3000} = process.env;
const app = express();

const MongoClient = require('mongoose');

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf8'
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(PORT, () => {
  console.log(" Express Working");
})


// создаем объект MongoClient и передаем ему строку подключения
const url = "mongodb://localhost:27017/mestodb"
const mongoClient = new MongoClient(url);
//с помощью метода connect происходит подключение к серверу
mongoClient.connect(function(err, client){

//err (возникшая ошибка при установке соединения)
// и client (ссылка на подключенный к серверу клиент).

  if(err){
    return console.log(err);
  }
  //Если же ошибки нет, то мы можем взаимодействовать с сервером через объект client.
  // взаимодействие с базой данных
  client.close();
});












/*
async function run() {
  try {
    // Подключаемся к серверу
    await mongoClient.connect();
    // взаимодействие с базой данных
  }catch(err) {
    console.log(err);
  } finally {
    // Закрываем подключение при завершении работы или при ошибке
    await mongoClient.close();
  }
}
run();*/


/*const express = require('express');
const http = require('http');
const path = require('path');
const {PORT = 3000} = process.env;
const app = express();

const server = http.createServer((req, res) => {

  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200,'OK',{'Content-Type': 'text/html'});
    res.end(mainPageMarkup);}

  if (req.url === '/submit' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end',() =>{
      res.writeHead(200, 'OK', {'Content-Type': 'text/html'});
      res.end(submitSuccessMarkup); });
  }
});

app.use(express.static(path.join(__dirname, 'public')));
server.listen(PORT, ()=>{
    console.log(` App listening ${PORT}`);
  }

/* res.writeHead(200, {
  'Content-Type': 'text/html; charset=utf8'
});

}
);

*/

