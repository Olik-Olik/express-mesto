const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');

const isUrl = require('validator/lib/isURL');
const ConflictError = require('../errors/ConflictError');
const InternalServerError = require('../errors/InternalServerError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about:
    {
      type: String,
      required: false,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },
  avatar:
    {
      type: String,
      required: false,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: {
        validator: (link) => isUrl(link),
      },
      message: 'Измените линк-он неправильный',
    },

  // существование и подлинность
  email: {
    type: String,
    required: true,
    unique: true, // Так в базе не окажется несколько пользователей с одинаковой почтой
    validate: {
      validator: (v) => isEmail(v),
      message: 'Измените формат почты-он неправильный',
    },
  },

  password: {
    type: String,
    required: true,
    select: false, // по умолчанию хеш пароля пользователя не будет возвращаться из базы
  },
});

/* userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        console.log('User not found');
        throw new Error('Неправильный email или пароль');
      }
      // eslint-disable-next-line no-undef
      bcrypt.compare(password, user.password, (err, res) => {
        if (err){
          console.log(err);
          throw new Error('Неправильный email или пароль');
        }
        console.log('Res: ' + res.toString());
        if (res) {
          console.log('Usr: ' + user.toString());
          return user;
        }
        throw new Error('Неправильный email или пароль');
      });
    }).catch(() => {
      throw new InternalServerError();
    });
}; */
// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function ({ email, password }) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        console.log('User not found');
        return new ConflictError('Неправильный email или пароль');
        // return Promise.reject(new Error('Неправильный email или пароль'));
      }
      return bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          console.log(err);
          throw new Error('Неправильный email или пароль');
        }
        console.log(`Res: ${res.toString()}`);
        if (res) {
          console.log(`Usr: ${user.toString()}`);
          return {
            data: {
              name: user.name,
              about: user.about,
              avatar: user.avatar,
              email: user.email,
            },
          };
        }
        throw new Error('Неправильный email или пароль');
      })
        .then((matched) => {
          if (!matched) {
            throw new ConflictError('Неправильный email или пароль');
            // return Promise.reject(new Error('Неправильный email или пароль'));
          }
          return {
            data: {
              name: user.name,
              about: user.about,
              avatar: user.avatar,
              email: user.email,
            },
          };
        }).catch(() => {
          throw new InternalServerError();
        });
    });
};

module.exports = mongoose.model('user', userSchema);
