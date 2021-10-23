const { celebrate, Joi } = require('celebrate');
require('validator');
const linkValidate = require('validator/lib/isURL');
// const regex =
// const linkValidator = url(regex)
/* const linkValidator (link) => {if linkValidator.Url(link) */

function linkValidator(url) {
  return linkValidate(url, {
    protocols: ['http', 'https', 'ftp'],
    require_tld: true,
    require_protocol: true,
  });
}

const userValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    age: Joi.number().integer().required().min(18),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
});
const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
});
const updateUserValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
});

const updateAvatarValidate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .regex(/(http|https):\/\/(www)?\.?([A-Za-z0-9.-]+)\.([A-z]{2,})((?:\/[+~%/.\w-_]*)?\??(?:[-=&;%@.\w_]*)#?(?:[\w]*))?/).required(),
    linkValidator,
  }).unknown(true),
});

const cardValidate = celebrate({
  body: Joi.object().keys({
    link: linkValidator,
    name: Joi.string().required().min(2).max(30),
  }).unknown(true),
});

module.exports = {
  userValidate,
  loginValidate,
  updateUserValidate,
  updateAvatarValidate,
  cardValidate,
};
