const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request');
const ForbiddenError = require('../errors/forbidden-error');

const getMovies = (req, res, next) => Movie.find({ owner: req.user._id })
  .then((movies) => res.status(200).send(movies))
  .catch(next);

const createMovie = (req, res, next) => {
  const {
    nameRU, country, director, duration, year, description, image,
    trailer, thumbnail, nameEN, movieId,
  } = req.body;
  const owner = req.user._id;

  return Movie.create({
    // eslint-disable-next-line max-len
    nameRU, country, director, duration, year, description, image, trailer, thumbnail, nameEN, movieId, owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } next(e);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => next(new NotFoundError('Нет карточки по данному id')))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Нет прав'));
      } else {
        Movie.deleteOne(movie)
          .then(() => res.send(movie));
      }
    })
    .catch(next);
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
