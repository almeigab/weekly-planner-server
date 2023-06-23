/* eslint-disable no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../utils/errors/BadRequestError';
import { UnknownError } from '../utils/errors/UnknownError';

export default function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof BadRequestError) {
    res.status(404).json({
      error:
        Object.values(err.causes?.[0].constraints || {})?.[0] || err.message,
    });
  }
  if (err instanceof UnknownError) {
    res.status(500).json({
      error: err.message,
    });
  }
}
