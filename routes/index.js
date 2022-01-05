const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./users');
const movieRouter = require('./movies');
const UnauthorizedError = require('../errors/unauthorized-error');

const { createUser, loginUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required().strict(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required().strict(),
  }),
}), loginUser);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.use((req, res) => {
  throw new UnauthorizedError('Страница не найдена!!!');
});

module.exports = router;
