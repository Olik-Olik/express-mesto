// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
//  console.log(req.headers);
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  const token = authorization.replace('Bearer: ', '');
  try {
    // console.log(token);
    jwt.verify(token, 'some-secret-key');
    // console.log(jwt.decode(token));
    req.userId = jwt.decode(token)._id;
    next();
  } catch (e) {
    // console.log(e);
    const err = new Error('Необходима авторизация');
    err.statusCode = 401;
    return res.status(401).send({ message: 'Необходима авторизация' });
    // next(err);
  }
};
// const extractBearerToken = (header) => header.replace('Bearer ', '');
