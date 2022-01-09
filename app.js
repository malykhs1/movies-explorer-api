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
// устанавливаем Rate Limeter
const { limiter } = require('./middlewares/limiter');
const routes = require('./routes/index');
// обработчик ошибок
const errorHandler = require('./middlewares/handlerError');
// экспорт логера
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { DATABASE } = require('./configs');

// подключаем БД
mongoose.connect(DATABASE, {
  useNewUrlParser: true,
});

app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(limiter);

app.use(routes);
app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`Сервер запущен на порту ${PORT}`);
});
