import { NextFunction, Request, Response } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import createHttpError, { HttpError } from 'http-errors';
import { HttpStatusCode } from 'axios';
import ValidatorError from '#src/Core/Framework/Error/ValidatorError';
import ResourceNotFoundError from '#src/Core/Framework/Error/ResourceNotFoundError';
import ResourceCreationError from '#src/Core/Framework/Error/ResourceCreationError';
import { SearchRequestException } from '#src/Core/DataAbstractionLayer/Error/SearchRequestException';

export const ErrorHandler404 = (_req: Request, _res: Response, next: NextFunction) => {
  next(createHttpError(HttpStatusCode.NotFound));
};

export const GlobalErrorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ValidatorError) {
    console.log(err.validationErrors);
    return res.status(HttpStatusCode.BadRequest).json({
      statusCode: HttpStatusCode.BadRequest,
      message: {
        ...err.validationErrors,
      },
    });
  }

  if (err instanceof SearchRequestException) {
    return res.status(HttpStatusCode.BadRequest).json({
      statusCode: HttpStatusCode.BadRequest,
      message: err.message,
    });
  }

  if (err instanceof HttpError && err.statusCode === HttpStatusCode.NotFound) {
    return res.status(HttpStatusCode.NotFound).json({
      statusCode: HttpStatusCode.NotFound,
      message: 'The route you are looking for not exists',
    });
  }

  if (err instanceof ResourceNotFoundError) {
    return res.status(HttpStatusCode.NotFound).json({
      statusCode: HttpStatusCode.NotFound,
      message: err.message,
    });
  }

  if (err instanceof ResourceCreationError) {
    return res.status(HttpStatusCode.InternalServerError).json({
      statusCode: HttpStatusCode.InternalServerError,
      message: err.message,
    });
  }

  if (err instanceof Error) {
    console.error('', err);
    return res.status(HttpStatusCode.InternalServerError).json({
      statusCode: HttpStatusCode.InternalServerError,
      message: 'An internal server error occurred',
    });
  }

  return res.status(HttpStatusCode.ServiceUnavailable).json({
    statusCode: HttpStatusCode.ServiceUnavailable,
    message: 'The service is temporarily not available, please try again later',
  });
};
