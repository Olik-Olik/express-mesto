// тут будет вся авторизация
// заведем токен
// const { NODE_ENV, JWT_SECRET } = process.env; // production и dev переменная окружения
// console.log(process.env) хранит все переменные окружения

// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
// мидлвару, которая вытянет и проверит заголовок на наличие токена
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // Сначала -  токена нет в заголовке
  if (!authorization || !authorization.startsWith('Bearer')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  // 1 крутяк - он есть
  // 2 достанем  токен (метод replace)
  // чтобы выкинуть из заголовка приставку 'Bearer' -схема аутентификаци- приходит ТОКЕН!!!
  // есть еще basic закодированное имя пользователя/пароль base64 вместо токена
  // извлечём токен -заменить Bearer на ''
  const token = authorization.replace('Bearer ', '');
  // Пейлоуд токена — зашифрованный в строку объект пользователя.
  let payload;
  // eslint-disable-next-line max-len
  // объявляем её до try уже косячила с этим:), а записываем значение позже — в фигурных скобках блока try
  // , чтобы выкинуть из заголовка приставку 'Bearer ':
  // Таким образом, в переменную token запишется только JWT.
  // Верифицируем токен
  // метод verify(токен и секретный ключ) модуля jsonwebtoken
  // верифицируем токен
  try {
    payload = jwt.verify(token, 'some-secret-key');
    // eslint-disable-next-line brace-style
  }
  // вернёт пейлоуд токена, если тот прошёл проверку, иначе-вернет ошибку
  // Чтобы её обработать, нужно обернуть метод jwt.verify в try...catch:
  catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next();
}; // пропускаем запрос дальше
// Теперь нужно записать пейлоуд в запрос — свойство req.user.
// Так следующий мидлвэр сможет определить, кем этот запрос был выполнен:
// Выставляем ошибке статус

// Пейлоуд токена — зашифрованный в строку объект пользователя.
//  На вход функция должна принимать заголовок и возвращать токен.
// const extractBearerToken = (header) => header.replace('Bearer ', '');
