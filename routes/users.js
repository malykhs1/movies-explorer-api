const router = require('express').Router();
const {
  getCurrentUser, updateUser,
} = require('../controllers/users');

const {
  validatateUserBody,
} = require('../middlewares/validation');

router.get('/me', getCurrentUser);

router.patch('/me', validatateUserBody, updateUser);

module.exports = router;
