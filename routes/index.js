const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/not-found-error');

const { createUser, loginUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateEmailAndPassword, validateRegistration } = require('../middlewares/validation');

router.post('/signup', validateRegistration, createUser);

router.post('/signin', validateEmailAndPassword, loginUser);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.use(auth, () => {
  throw new NotFoundError('Страница не найдена!!!');
});

module.exports = router;
