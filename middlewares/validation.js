const { celebrate, Joi } = require('celebrate');

const validatateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле "Name" обязательно должно быть заполнено',
      }),
    email: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле "Email" обязательно должно быть заполнено',
      }),
  }),
});

const validateEmailAndPassword = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().lowercase().required()
      .messages({
        'any.required': 'Поле "Email" обязательно должно быть заполнено',
      }),
    password: Joi.string().min(8).required().strict()
      .messages({
        'any.required': 'Поле "Password" обязательно должно быть заполнено',
      }),
  }),
});

const validateRegistration = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().lowercase().required()
      .messages({
        'any.required': 'Поле "Email" обязательно должно быть заполнено',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле "Name" обязательно должно быть заполнено',
      }),
    password: Joi.string().min(8).required().strict()
      .messages({
        'any.required': 'Поле "Password" обязательно должно быть заполнено',
      }),
  }),
});

const validateMovieBody = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Поле "nameRU" обязательно должно быть заполнено',
      }),
    country: Joi.string().required()
      .messages({
        'any.required': 'Поле "Country" обязательно должно быть заполнено',
      }),
    director: Joi.string().required().messages({
      'any.required': 'Поле "Director" обязательно должно быть заполнено',
    }),
    duration: Joi.number().required().messages({
      'any.required': 'Поле "Duration" обязательно должно быть заполнено',
    }),
    year: Joi.string().required().messages({
      'any.required': 'Поле "Year" обязательно должно быть заполнено',
    }),
    description: Joi.string().required().messages({
      'any.required': 'Поле "Description" обязательно должно быть заполнено',
    }),
    image: Joi.string().regex(/^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/).required().messages({
      'any.required': 'Поле "Image" обязательно должно быть заполнено',
    }),
    trailer: Joi.string().regex(/^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/).required().messages({
      'any.required': 'Поле "Trailer" обязательно должно быть заполнено',
    }),
    thumbnail: Joi.string().regex(/^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/).required().messages({
      'any.required': 'Поле "Thumbnail" обязательно должно быть заполнено',
    }),
    movieId: Joi.number().required().messages({
      'any.required': 'Поле "movieId" обязательно должно быть заполнено',
    }),
    nameEN: Joi.string().required().messages({
      'any.required': 'Поле "nameEN" обязательно должно быть заполнено',
    }),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex()
      .messages({
        'any.required': 'Поле "movieId" обязательно должно быть заполнено',
      }),

  }),
});

module.exports = {
  validateRegistration,
  validateEmailAndPassword,
  validatateUserBody,
  validateMovieBody,
  validateMovieId,
};
