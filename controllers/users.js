const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET_DEV } = require('../configs');

const { NODE_ENV, JWT_SECRET } = process.env;

const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request');
const ConflictError = require('../errors/conflict-error');
const UnauthorizedError = require('../errors/unauthorized-error');

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        return res.status(200).send({
          name: user.name,
          email: user.email,
        });
      }
      throw new NotFoundError('Токен не найден');
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } next(e);
    });
};
// создание пользователя
const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Такой email уже существует');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      User.create({
        email, password: hash, name,
      })
        .then((user) => res.status(201).send({
          name: user.name,
          email: user.email,
        }))
        .catch(next);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } next(e);
    });
};
// авторизация
const loginUser = (req, res, next) => {
  const { password, email } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неверный пароль или email');
      }

      return bcrypt.compare(password, user.password)

        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неверный пароль или email');
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign({
        _id: user._id,
      }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV, { expiresIn: '7d' });
      return res.status(201).send({ token });
    })
    .catch(next);
};

// обновление данный пользователя
const updateUser = (req, res, next) => User.findByIdAndUpdate(
  req.user._id,
  { ...req.body },
  {
    new: true,
    runValidators: true,
  },
)
  .then((user) => res.status(200).send(user))
  .catch((e) => {
    if (e.name === 'ValidationError') {
      next(new BadRequestError('Переданы некорректные данные'));
    } else if (e.name === 'MongoServerError') {
      next(new ConflictError('Введенные данные уже используются'));
    } else {
      next(e);
    }
  });

module.exports = {
  getCurrentUser, createUser, loginUser, updateUser,
};
