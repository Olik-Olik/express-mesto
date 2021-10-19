const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');

const isUrl = require('validator/lib/isURL');

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
    minlength: 8,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильный email или пароль'));
      }
      // eslint-disable-next-line no-undef
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Вообще-тут пароль в схемеНеправильный email или пароль'));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
