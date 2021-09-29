const express = require('express');
// Слушаем 3000 порт
const { PORT = 3001 } = process.env;

const app = express();

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})


/*
//console.log('In Node We Trust');
//Подключите API
// научить принимать сообщения, которые поступают на сетевую карту
//В JavaScript нет такой встроенной возможности, зато она есть в специальном API из Node.js.
// Имя этого API — http
const http = require('http');
//Создайте сервер
//даём библиотеке на C команду подключиться к сетевой карте и принимать сообщения.
// Теперь мы получаем к ним доступ из JavaScript-кода.

/!*const server = http.createServer();*!/

//Теперь мы можем принимать входящие сообщения. Но на них ещё
// нужно реагировать. Для этого функция createServer принимает
// колбэк — в нём и описывают код, который нужно запустить при получении запроса
//Установите ответ
const server = http.createServer((request, response) => {
    response.writeHead(200,
        {'Content-Type': 'text/html ; charset = utf8'});
    response.end();
}
)
//Вторым аргументом end принимает кодировку отправляемых данных.
// Каждый запрос должен заканчиваться вызовом этого метода.

/!*    console.log(request);
    console.log(response);
    console.log(request.url); // /hello
    console.log(request.method); // GET
    console.log(request.headers); // здесь будут заголовки запроса
    console.log(request.body); // а здесь тело запроса, но у GET запроса его нет
 response.statusCode = 200;// статус ответа
 //можно и совместить

 response.statusMessage = "OK";// сообщение ответа
 response.setHeader('Content-Type', 'text/plain');// добавить ответу заголовок
    response.write('Hello, '); // отправить часть ответа — строку "Hello, "
    response.write('world!'); // отправить часть ответа — строку "world!"
    response.end(); // закончить отправку ответа
});*!/
//Сейчас мы захардкодили (то есть явно указали в коде) входящий порт.
// Это не лучшая практика: входящие данные лучше передавать параметрами.
//Для этого перед командой запуска прописывают имена переменных и их значения:
//NODE_ENV=production node index.js
//Внутри скриптов переменные окружения хранятся в объекте process.env:
//if (process.env.NODE_ENV !=='production'){
//   console.log('Код запущен в режиме разработки')

//PORT=3000 node app.js
server.listen(3000); // будем принимать сообщения с 3000 порта

//Настройте запрос и ответ



*/
