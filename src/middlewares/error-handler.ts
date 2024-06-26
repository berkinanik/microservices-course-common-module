import type { ErrorRequestHandler } from 'express';

import { CustomError, UnknownError } from '../errors';

export const errorHandlerMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error('🚀 ~ err:', err);
  }

  let error: CustomError;

  if (err instanceof CustomError) {
    error = err;
  } else {
    error = new UnknownError();
  }

  return res.status(error.statusCode).send(error.serializeErrors());
};
