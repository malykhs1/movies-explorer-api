const router = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const {
  validateMovieBody,
  validateMovieId,
} = require('../middlewares/validation');

router.post('/', validateMovieBody, createMovie);

router.delete('/:movieId', validateMovieId, deleteMovie);

router.get('/', getMovies);

module.exports = router;
