const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  nameRU: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Это не ссылка',
    },
  },
  trailer: {
    type: String,
    require: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Это не ссылка',
    },
  },
  thumbnail: {
    type: String,
    require: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Это не ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieID: {
    type: Number,
    require: true,
  },
  nameEN: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('movies', movieSchema);
