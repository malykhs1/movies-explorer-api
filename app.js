// устанвливаем express
const express = require('express');
// добавляем helmet для защиты
const helmet = require('helmet');
// создаем приложение методом express
const app = express();
// слушаем порт 3000
const { PORT = 3000 } = process.env;
// импорт БД
const mongoose = require('mongoose');
// импортов роутов
const { errors } = require('celebrate');
const routes = require('./routes/index');
// обработчик ошибок
// экспорт логера
const { requestLogger, errorLogger } = require('./middlewares/logger');

// подключаем БД
mongoose.connect('mongodb://localhost:27017/moviesbd', {
  useNewUrlParser: true,
});
app.use(helmet());
app.use(express.json());
app.use(requestLogger);

app.use(routes);
app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`Сервер запущен на порту ${PORT}`);
});
