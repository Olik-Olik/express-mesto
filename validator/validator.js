const { celebrate, Joi } = require('celebrate');
const validators = require('validator');// для проверки url посмотреть

const linkValidate = validators.isURL({
  message: 'Must be a Valid URL',
  protocols: ['http', 'https', 'ftp'],
  require_tld: true,
  require_protocol: true,
});

const userValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    age: Joi.number().integer().required().min(18),
    about: Joi.string().min(2).max(30),
  }),
});
const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});
const updateUserValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

/*
const updateAvatarValidate = celebrate({
  body: Joi.object().keys({
    // url!!! посмотреть как
    //   avatar: Joi.string().required().(linkValidation)

  }),
});

const cardValidate = celebrate({
  body: Joi.object().keys({
    link: Joi.string().required().(linkValidation),
    name: Joi.string().required().min(2).max(30),
  }),
});

const idValidate = celebrate({
  body: Joi.object().keys({
    _id: Joi.string().required(),

  }),
});
*/

module.exports = {
  userValidate,
  loginValidate,
  updateUserValidate,
  //  updateAvatarValidate,
  //  createCardValidate,
  //  idValidate,
  linkValidate,
};

/*
буквы, цифры, запятые и периоды,имволам в диапазонах az, AZ, 0-9 и пробелам и запятой.
const schema = Joi.object().keys({
  // ...
  comments: Joi.string().regex(/^[,. a-z0-9]+$/).required(),
  // ...
});

// eslint-disable-next-line max-len
Joi.string().regex(/^[a-zA-Z0-9, ]*$/,
 'Alphanumerics, space and comma characters').min(3).max(30).required()
*/
