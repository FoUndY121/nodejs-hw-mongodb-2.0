import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err,
    });
    return;
  }
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
};
//тут как раз таки HttpError работает как useState то есть мы передали туда ошибку с помощью throw createHttpError(404, 'Contact not found'); и если ошибка есть то мы попадаем в if и отдаем ошибку клиенту если ошибки нет то мы попадаем в 500 ошибку
