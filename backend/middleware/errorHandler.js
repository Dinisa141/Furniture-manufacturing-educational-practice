// Глобальный обработчик ошибок
const errorHandler = (err, req, res, next) => {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Определяем статус код ошибки
  const statusCode = err.statusCode || 500;
  
  // Формируем ответ
  const response = {
    error: {
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  };

  res.status(statusCode).json(response);
};

// Обработчик для 404 ошибок (не найден маршрут)
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

// Кастомный класс для ошибок API
class APIError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  errorHandler,
  notFoundHandler,
  APIError
};